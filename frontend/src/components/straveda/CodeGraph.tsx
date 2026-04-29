'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Filter,
  X,
  Info,
  GitBranch,
  FileCode2,
  Boxes,
  Layers,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Download,
  MousePointer2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GraphNode {
  id: string;
  label: string;
  category: string;
  path: string;
  size: number;
  imports: string[];
}

interface GraphEdge {
  source: string;
  target: string;
  label: string;
}

interface GraphStats {
  totalFiles: number;
  totalEdges: number;
  categories: { name: string; count: number; color: string }[];
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  stats: GraphStats;
}

interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number | null;
  fy?: number | null;
}

/* ------------------------------------------------------------------ */
/*  Category display names                                             */
/* ------------------------------------------------------------------ */

const CATEGORY_LABELS: Record<string, string> = {
  'app/page': 'App Pages',
  'app/api': 'API Routes',
  'pages': 'Page Components',
  'straveda': 'Straveda Components',
  'ui': 'UI Components',
  'blocks': 'Blocks',
  'hooks': 'Hooks',
  'lib': 'Libraries',
  'other': 'Other',
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'app/page': <FileCode2 className="w-3.5 h-3.5" />,
  'app/api': <GitBranch className="w-3.5 h-3.5" />,
  'pages': <Layers className="w-3.5 h-3.5" />,
  'straveda': <Boxes className="w-3.5 h-3.5" />,
  'ui': <Boxes className="w-3.5 h-3.5" />,
  'blocks': <Boxes className="w-3.5 h-3.5" />,
  'hooks': <AlertTriangle className="w-3.5 h-3.5" />,
  'lib': <FileCode2 className="w-3.5 h-3.5" />,
  'other': <FileCode2 className="w-3.5 h-3.5" />,
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const REPULSION = 800;
const ATTRACTION = 0.006;
const CENTER_FORCE = 0.02;
const DAMPING = 0.85;
const MAX_VELOCITY = 10;
const EPS = 0.001;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simNodesRef = useRef<SimNode[]>([]);
  const edgesRef = useRef<GraphEdge[]>([]);
  const animFrameRef = useRef<number>(0);

  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<SimNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [showInfo, setShowInfo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragNode, setDragNode] = useState<SimNode | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Camera state refs for smooth interaction
  const cameraRef = useRef({ zoom: 1, x: 0, y: 0 });
  const isDraggingCanvas = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const activeCategoriesRef = useRef<Set<string>>(new Set());
  const searchQueryRef = useRef('');

  // Fetch graph data
  useEffect(() => {
    async function fetchGraph() {
      try {
        setLoading(true);
        const res = await fetch('/api/code-graph');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: GraphData = await res.json();
        setGraphData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load graph');
      } finally {
        setLoading(false);
      }
    }
    fetchGraph();
  }, []);

  // Initialize simulation nodes
  useEffect(() => {
    if (!graphData || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const nodes: SimNode[] = graphData.nodes.map((n, i) => {
      const angle = (i / graphData.nodes.length) * Math.PI * 2;
      const radius = 200 + Math.random() * 150;
      return {
        ...n,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
      };
    });

    simNodesRef.current = nodes;
    edgesRef.current = graphData.edges;
    activeCategoriesRef.current = activeCategories;
  }, [graphData]);

  // Keep refs in sync
  useEffect(() => {
    activeCategoriesRef.current = activeCategories;
  }, [activeCategories]);
  useEffect(() => {
    searchQueryRef.current = searchQuery;
  }, [searchQuery]);

  // Highlight connected nodes on selection
  useEffect(() => {
    if (selectedNode) {
      const connected = new Set<string>();
      connected.add(selectedNode.id);
      for (const edge of edgesRef.current) {
        if (edge.source === selectedNode.id) connected.add(edge.target);
        if (edge.target === selectedNode.id) connected.add(edge.source);
      }
      setHighlightedNodes(connected);
    } else {
      setHighlightedNodes(new Set());
    }
  }, [selectedNode]);

  // Force simulation loop
  const simulate = useCallback(() => {
    const nodes = simNodesRef.current;
    const edges = edgesRef.current;
    if (nodes.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const activeCats = activeCategoriesRef.current;

    // Repulsion between all nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        const dist = Math.max(EPS, Math.sqrt(dx * dx + dy * dy));
        const force = REPULSION / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx -= fx;
        a.vy -= fy;
        b.vx += fx;
        b.vy += fy;
      }
    }

    // Attraction along edges
    for (const edge of edges) {
      const a = nodes.find(n => n.id === edge.source);
      const b = nodes.find(n => n.id === edge.target);
      if (!a || !b) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.max(EPS, Math.sqrt(dx * dx + dy * dy));
      const force = dist * ATTRACTION;
      a.vx += (dx / dist) * force;
      a.vy += (dy / dist) * force;
      b.vx -= (dx / dist) * force;
      b.vy -= (dy / dist) * force;
    }

    // Center gravity + damping + velocity cap
    for (const node of nodes) {
      if (node.fx !== null && node.fy !== null) {
        node.vx = 0;
        node.vy = 0;
        continue;
      }
      node.vx += (cx - node.x) * CENTER_FORCE;
      node.vy += (cy - node.y) * CENTER_FORCE;
      node.vx *= DAMPING;
      node.vy *= DAMPING;
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed > MAX_VELOCITY) {
        node.vx = (node.vx / speed) * MAX_VELOCITY;
        node.vy = (node.vy / speed) * MAX_VELOCITY;
      }
      node.x += node.vx;
      node.y += node.vy;
    }
  }, []);

  // Render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const nodes = simNodesRef.current;
    const edges = edgesRef.current;
    const cam = cameraRef.current;
    const activeCats = activeCategoriesRef.current;
    const query = searchQueryRef.current.toLowerCase();
    const hasFilter = activeCats.size > 0;
    const hasSearch = query.length > 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid
    ctx.save();
    ctx.translate(cam.x, cam.y);
    ctx.scale(cam.zoom, cam.zoom);

    const gridSize = 60;
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 0.5;
    for (let x = -2000; x < 4000; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, -2000);
      ctx.lineTo(x, 4000);
      ctx.stroke();
    }
    for (let y = -2000; y < 4000; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(-2000, y);
      ctx.lineTo(4000, y);
      ctx.stroke();
    }

    // Determine visibility
    const visibleNodeIds = new Set<string>();
    for (const node of nodes) {
      const matchesFilter = !hasFilter || activeCats.has(node.category);
      const matchesSearch = !hasSearch || node.label.toLowerCase().includes(query) || node.id.toLowerCase().includes(query);
      if (matchesFilter && matchesSearch) {
        visibleNodeIds.add(node.id);
      }
    }

    const dimmed = hasFilter || hasSearch || highlightedNodes.size > 0;

    // Draw edges
    for (const edge of edges) {
      const a = nodes.find(n => n.id === edge.source);
      const b = nodes.find(n => n.id === edge.target);
      if (!a || !b) continue;

      const aVisible = visibleNodeIds.has(a.id);
      const bVisible = visibleNodeIds.has(b.id);

      if (hasFilter && (!aVisible || !bVisible)) continue;
      if (hasSearch && (!aVisible || !bVisible)) continue;

      const isHighlighted =
        highlightedNodes.has(a.id) && highlightedNodes.has(b.id);

      let alpha = dimmed ? 0.03 : 0.12;
      let width = 0.5;

      if (highlightedNodes.size > 0 && isHighlighted) {
        alpha = 0.5;
        width = 1.5;
      }

      // Gradient edge colors
      const aColor = graphData?.stats.categories.find(c => c.name === a.category)?.color ?? '#6B7280';
      const bColor = graphData?.stats.categories.find(c => c.name === b.category)?.color ?? '#6B7280';

      const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      grad.addColorStop(0, aColor + (alpha < 0.1 ? '20' : alpha > 0.3 ? '80' : '40'));
      grad.addColorStop(1, bColor + (alpha < 0.1 ? '20' : alpha > 0.3 ? '80' : '40'));

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = width;
      ctx.stroke();
    }

    // Draw nodes
    for (const node of nodes) {
      const matchesFilter = !hasFilter || activeCats.has(node.category);
      const matchesSearch = !hasSearch || node.label.toLowerCase().includes(query) || node.id.toLowerCase().includes(query);
      if (hasFilter && !matchesFilter) continue;
      if (hasSearch && !matchesSearch) continue;

      const catColor =
        graphData?.stats.categories.find(c => c.name === node.category)?.color ?? '#6B7280';
      const isHovered = hoveredNode?.id === node.id;
      const isSelected = selectedNode?.id === node.id;
      const isConnected = highlightedNodes.has(node.id);
      const dim = dimmed && !isSelected && !isConnected && !isHovered;

      const r = Math.max(EPS, node.size * (isHovered ? 1.3 : isSelected ? 1.25 : 1));

      // Glow for selected/hovered
      if (isSelected || isHovered) {
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
        glow.addColorStop(0, catColor + '30');
        glow.addColorStop(1, catColor + '00');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(EPS, r * 4), 0, Math.PI * 2);
        ctx.fill();
      }

      // Outer ring
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(EPS, r + 4), 0, Math.PI * 2);
        ctx.strokeStyle = catColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Node circle
      const alpha = dim ? '40' : isHovered || isSelected ? 'ff' : 'cc';
      ctx.beginPath();
      ctx.arc(node.x, node.y, Math.max(EPS, r), 0, Math.PI * 2);

      const fillGrad = ctx.createRadialGradient(
        node.x - r * 0.3, node.y - r * 0.3, 0,
        node.x, node.y, r
      );
      fillGrad.addColorStop(0, catColor + (dim ? '50' : 'dd'));
      fillGrad.addColorStop(1, catColor + (dim ? '25' : '99'));
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Border
      ctx.strokeStyle = catColor + (dim ? '30' : '60');
      ctx.lineWidth = 1;
      ctx.stroke();

      // Label for larger / hovered / selected nodes
      if (r > 6 || isHovered || isSelected) {
        const labelAlpha = dim ? 0.15 : isHovered || isSelected ? 1 : 0.6;
        const fontSize = isHovered || isSelected ? 12 : 10;
        ctx.font = `${isHovered || isSelected ? '600' : '500'} ${fontSize}px system-ui, sans-serif`;
        ctx.fillStyle = `rgba(255,255,255,${labelAlpha})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Background for label readability
        const label = node.label.split('/').pop() || node.label;
        const textWidth = ctx.measureText(label).width;
        if (isSelected || isHovered) {
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.fillRect(
            node.x - textWidth / 2 - 4,
            node.y + r + 4,
            textWidth + 8,
            fontSize + 6
          );
          ctx.fillStyle = catColor;
        }

        ctx.font = `${isHovered || isSelected ? '600' : '500'} ${fontSize}px system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(label, node.x, node.y + r + 6);
      }
    }

    ctx.restore();
  }, [graphData, hoveredNode, selectedNode, highlightedNodes]);

  // Animation loop
  useEffect(() => {
    if (!graphData) return;

    const loop = () => {
      simulate();
      render();
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [graphData, simulate, render]);

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    function resize() {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      // Reset camera
      cameraRef.current.zoom = 1;
      cameraRef.current.x = 0;
      cameraRef.current.y = 0;
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Mouse / interaction handlers
  const getNodeAtPos = useCallback(
    (mouseX: number, mouseY: number): SimNode | null => {
      const cam = cameraRef.current;
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const worldX = (mouseX - rect.left - cam.x) / cam.zoom;
      const worldY = (mouseY - rect.top - cam.y) / cam.zoom;

      const nodes = simNodesRef.current;
      // Search in reverse so topmost drawn node is found first
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dx = worldX - n.x;
        const dy = worldY - n.y;
        if (dx * dx + dy * dy < (n.size + 4) * (n.size + 4)) {
          return n;
        }
      }
      return null;
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function onMouseDown(e: MouseEvent) {
      const node = getNodeAtPos(e.clientX, e.clientY);
      if (node) {
        setDragNode(node);
        node.fx = node.x;
        node.fy = node.y;
        setIsDragging(true);
      } else {
        isDraggingCanvas.current = true;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }
    }

    function onMouseMove(e: MouseEvent) {
      const node = getNodeAtPos(e.clientX, e.clientY);
      setHoveredNode(node);
      setTooltipPos({ x: e.clientX, y: e.clientY });
      canvas.style.cursor = node ? 'pointer' : isDraggingCanvas.current ? 'grabbing' : 'grab';

      if (dragNode) {
        const cam = cameraRef.current;
        const rect = canvas.getBoundingClientRect();
        dragNode.fx = (e.clientX - rect.left - cam.x) / cam.zoom;
        dragNode.fy = (e.clientY - rect.top - cam.y) / cam.zoom;
        dragNode.x = dragNode.fx;
        dragNode.y = dragNode.fy;
      }

      if (isDraggingCanvas.current) {
        const dx = e.clientX - lastMouse.current.x;
        const dy = e.clientY - lastMouse.current.y;
        cameraRef.current.x += dx;
        cameraRef.current.y += dy;
        setPan({ x: cameraRef.current.x, y: cameraRef.current.y });
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }
    }

    function onMouseUp() {
      if (dragNode) {
        dragNode.fx = null;
        dragNode.fy = null;
        setDragNode(null);
      }
      setIsDragging(false);
      isDraggingCanvas.current = false;
    }

    function onClick(e: MouseEvent) {
      const node = getNodeAtPos(e.clientX, e.clientY);
      setSelectedNode(prev => (prev?.id === node?.id ? null : node ?? null));
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(0.1, Math.min(5, cameraRef.current.zoom * delta));

      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Zoom toward mouse position
      cameraRef.current.x = mx - (mx - cameraRef.current.x) * (newZoom / cameraRef.current.zoom);
      cameraRef.current.y = my - (my - cameraRef.current.y) * (newZoom / cameraRef.current.zoom);
      cameraRef.current.zoom = newZoom;

      setZoom(newZoom);
      setPan({ x: cameraRef.current.x, y: cameraRef.current.y });
    }

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [getNodeAtPos, dragNode]);

  // Touch support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let lastTouchDist = 0;

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        const node = getNodeAtPos(t.clientX, t.clientY);
        if (node) {
          setDragNode(node);
          node.fx = node.x;
          node.fy = node.y;
        } else {
          isDraggingCanvas.current = true;
          lastMouse.current = { x: t.clientX, y: t.clientY };
        }
      }
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastTouchDist = Math.sqrt(dx * dx + dy * dy);
      }
    }

    function onTouchMove(e: TouchEvent) {
      e.preventDefault();
      if (e.touches.length === 1) {
        const t = e.touches[0];
        if (dragNode) {
          const cam = cameraRef.current;
          const rect = canvas.getBoundingClientRect();
          dragNode.fx = (t.clientX - rect.left - cam.x) / cam.zoom;
          dragNode.fy = (t.clientY - rect.top - cam.y) / cam.zoom;
          dragNode.x = dragNode.fx;
          dragNode.y = dragNode.fy;
        } else if (isDraggingCanvas.current) {
          const dx = t.clientX - lastMouse.current.x;
          const dy = t.clientY - lastMouse.current.y;
          cameraRef.current.x += dx;
          cameraRef.current.y += dy;
          setPan({ x: cameraRef.current.x, y: cameraRef.current.y });
          lastMouse.current = { x: t.clientX, y: t.clientY };
        }
      }
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (lastTouchDist > 0) {
          const scale = dist / lastTouchDist;
          cameraRef.current.zoom = Math.max(0.1, Math.min(5, cameraRef.current.zoom * scale));
          setZoom(cameraRef.current.zoom);
        }
        lastTouchDist = dist;
      }
    }

    function onTouchEnd() {
      if (dragNode) {
        dragNode.fx = null;
        dragNode.fy = null;
        setDragNode(null);
      }
      isDraggingCanvas.current = false;
      lastTouchDist = 0;
    }

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [getNodeAtPos, dragNode]);

  // Controls
  function handleZoomIn() {
    const newZoom = Math.min(5, cameraRef.current.zoom * 1.2);
    cameraRef.current.zoom = newZoom;
    setZoom(newZoom);
  }

  function handleZoomOut() {
    const newZoom = Math.max(0.1, cameraRef.current.zoom * 0.8);
    cameraRef.current.zoom = newZoom;
    setZoom(newZoom);
  }

  function handleReset() {
    cameraRef.current = { zoom: 1, x: 0, y: 0 };
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(null);
    setSearchQuery('');
    setActiveCategories(new Set());
  }

  function toggleCategory(cat: string) {
    setActiveCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function exportGraph() {
    if (!graphData) return;
    const blob = new Blob([JSON.stringify(graphData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-graph.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <div className="relative w-full h-full min-h-screen bg-[#0a0a12] overflow-hidden">
      {/* Canvas */}
      <div ref={containerRef} className="absolute inset-0">
        <canvas ref={canvasRef} className="block" />
      </div>

      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-[#0a0a12] z-50"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-2 border-[#FF4800]/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF4800] animate-spin" />
                <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#2B2358] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              </div>
              <div className="text-center">
                <p className="text-white/80 text-lg font-medium">Analyzing Codebase</p>
                <p className="text-white/40 text-sm mt-1">Building dependency graph...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error overlay */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-[#0a0a12] z-50"
          >
            <div className="text-center max-w-md px-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-white text-lg font-medium">Failed to Load Graph</p>
              <p className="text-white/50 text-sm mt-2">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="mt-4 border-white/20 text-white hover:bg-white/10"
              >
                Retry
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      {!loading && !error && (
        <>
          {/* Header bar */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 sm:px-6">
            {/* Left: Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                <GitBranch className="w-4 h-4 text-[#FF4800]" />
                <span className="text-white/90 text-sm font-medium hidden sm:inline">Code Graph</span>
                <span className="text-[#FF4800] text-xs">v1.0</span>
              </div>
              {graphData && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-xs text-white/50">
                  <span>{graphData.stats.totalFiles} files</span>
                  <span className="text-white/20">·</span>
                  <span>{graphData.stats.totalEdges} edges</span>
                </div>
              )}
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-1.5">
              {/* Search */}
              <div className="relative">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 transition-colors focus-within:border-[#FF4800]/40">
                  <Search className="w-3.5 h-3.5 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files..."
                    className="bg-transparent text-white/80 text-sm outline-none w-28 sm:w-40 placeholder:text-white/30"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-white/40 hover:text-white/70">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Zoom controls */}
              <div className="flex items-center rounded-lg bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
                <button onClick={handleZoomOut} className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-white/50 text-xs min-w-[40px] text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={handleZoomIn} className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button onClick={handleReset} className="p-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors" title="Reset view">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button onClick={exportGraph} className="p-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors" title="Export JSON">
                <Download className="w-3.5 h-3.5" />
              </button>

              <button onClick={() => setShowInfo(!showInfo)} className={`p-1.5 rounded-lg backdrop-blur-md border transition-colors ${showInfo ? 'bg-[#FF4800]/20 border-[#FF4800]/40 text-[#FF4800]' : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'}`}>
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Info panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-16 right-4 sm:right-6 z-30 w-72 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white/90 text-sm font-medium">About Code Graph</h3>
                  <button onClick={() => setShowInfo(false)} className="text-white/40 hover:text-white/70">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-3 text-xs text-white/60">
                  <p>
                    Interactive visualization of the Straveda codebase architecture. Each node represents a file,
                    and edges represent import dependencies.
                  </p>
                  <div className="space-y-1.5">
                    <p className="text-white/80 font-medium">Controls:</p>
                    <div className="flex items-center gap-2">
                      <MousePointer2 className="w-3 h-3 text-[#FF4800]" />
                      <span>Click & drag nodes to reposition</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MousePointer2 className="w-3 h-3 text-[#FF4800]" />
                      <span>Click background & drag to pan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-3 h-3 text-[#FF4800]" />
                      <span>Scroll to zoom in/out</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Search className="w-3 h-3 text-[#FF4800]" />
                      <span>Search to highlight matching files</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left sidebar: Category legend + filter */}
          <div className="absolute left-4 sm:left-6 top-16 z-20">
            <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden w-56">
              <button
                onClick={() => {
                  const el = document.getElementById('category-list');
                  if (el) el.classList.toggle('hidden');
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 text-white/70 text-xs font-medium hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-3 h-3" />
                  <span>Categories</span>
                </div>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div id="category-list">
                {graphData?.stats.categories.map((cat) => {
                  const isActive = activeCategories.has(cat.name);
                  return (
                    <button
                      key={cat.name}
                      onClick={() => toggleCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/50 hover:bg-white/5 hover:text-white/70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span>{CATEGORY_LABELS[cat.name] || cat.name}</span>
                      </div>
                      <span className="tabular-nums">{cat.count}</span>
                    </button>
                  );
                })}
                {activeCategories.size > 0 && (
                  <button
                    onClick={() => setActiveCategories(new Set())}
                    className="w-full flex items-center justify-center px-3 py-2 text-xs text-[#FF4800] hover:bg-[#FF4800]/10 transition-colors border-t border-white/5"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bottom: Selected node details */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-20"
              >
                <div className="max-w-2xl mx-auto rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor:
                              graphData?.stats.categories.find(c => c.name === selectedNode.category)?.color ?? '#6B7280',
                          }}
                        />
                        <span className="text-white/90 text-sm font-medium truncate">
                          {selectedNode.label}
                        </span>
                      </div>
                      <p className="text-white/40 text-xs font-mono truncate mb-2">{selectedNode.id}</p>

                      <div className="flex flex-wrap gap-3 text-xs">
                        <div className="flex items-center gap-1.5 text-white/50">
                          <span className="text-white/30">Category:</span>
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                            style={{
                              backgroundColor:
                                (graphData?.stats.categories.find(c => c.name === selectedNode.category)?.color ?? '#6B7280') + '20',
                              color: graphData?.stats.categories.find(c => c.name === selectedNode.category)?.color ?? '#6B7280',
                            }}
                          >
                            {CATEGORY_LABELS[selectedNode.category] || selectedNode.category}
                          </span>
                        </div>
                        <div className="text-white/50">
                          <span className="text-white/30">Imports:</span>{' '}
                          <span className="text-white/70">{selectedNode.imports.length}</span>
                        </div>
                        <div className="text-white/50">
                          <span className="text-white/30">Size:</span>{' '}
                          <span className="text-white/70">{Math.round(selectedNode.size)}</span>
                        </div>
                      </div>

                      {selectedNode.imports.length > 0 && (
                        <div className="mt-3">
                          <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1.5">Dependencies</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedNode.imports.slice(0, 12).map((imp, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/50 border border-white/5"
                              >
                                {imp.split('/').pop()}
                              </span>
                            ))}
                            {selectedNode.imports.length > 12 && (
                              <span className="px-2 py-0.5 rounded text-[10px] text-white/30">
                                +{selectedNode.imports.length - 12} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="p-1 text-white/40 hover:text-white/70 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoveredNode && !selectedNode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed z-40 pointer-events-none px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 text-xs text-white/80"
                style={{
                  left: tooltipPos.x + 12,
                  top: tooltipPos.y - 8,
                }}
              >
                {hoveredNode.label}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom-right: Stats badge */}
          <div className="absolute bottom-4 right-4 sm:right-6 z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-xs text-white/40">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>Live</span>
              <span className="text-white/20">·</span>
              <span>{graphData?.stats.totalFiles ?? 0} nodes</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
