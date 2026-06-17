"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, GitBranch, Cpu, Database, Eye, Terminal, ArrowRight, Activity } from "lucide-react";

interface NodeDetails {
  title: string;
  role: string;
  tech: string;
  detail: string;
}

interface Pipeline {
  name: string;
  description: string;
  icon: React.ReactNode;
  nodes: {
    id: string;
    label: string;
    x: number;
    y: number;
    icon: string;
    details: NodeDetails;
  }[];
  connections: { from: string; to: string }[];
}

export default function ArchitectureLab() {
  const [activePipeline, setActivePipeline] = useState<string>("RAG");
  const [selectedNode, setSelectedNode] = useState<string>("rag-vector");

  const pipelines: Record<string, Pipeline> = {
    RAG: {
      name: "RAG Architecture",
      description: "Advanced Retrieval-Augmented Generation pipeline featuring semantic search, hybrid query routers, and prompt safety guardrails.",
      icon: <Database className="w-5 h-5 text-accent" />,
      nodes: [
        {
          id: "rag-input",
          label: "User Query",
          x: 80,
          y: 150,
          icon: "input",
          details: {
            title: "User Prompt Ingestion",
            role: "Captures natural language query from front-end clients.",
            tech: "Next.js -> API Gateway -> FastAPI",
            detail: "Sanitizes strings, extracts user session tokens, and applies query history formatting to carry conversational context into retrieval."
          }
        },
        {
          id: "rag-guard",
          label: "Guardrails",
          x: 230,
          y: 150,
          icon: "guard",
          details: {
            title: "LlamaGuard Input Checker",
            role: "Inspects prompt for injection attacks, hate speech, PII leak, and adversarial jailbreaks.",
            tech: "LlamaGuard-3 / NeMo Guardrails",
            detail: "Runs a fast token-classification check. Prompts violating safety policies are aborted immediately with a soft system fallback response."
          }
        },
        {
          id: "rag-embed",
          label: "Embedding LLM",
          x: 380,
          y: 150,
          icon: "embed",
          details: {
            title: "Vector Embeddings Model",
            role: "Converts text queries into dense vector coordinates representing semantic meaning.",
            tech: "OpenAI text-embedding-3-large / Cohere v3",
            detail: "Transforms a variable-length string into a 1536-dimensional float vector. Normalizes vectors to enable fast cosine similarity calculation."
          }
        },
        {
          id: "rag-vector",
          label: "Vector Store",
          x: 530,
          y: 150,
          icon: "db",
          details: {
            title: "Pinecone Vector Index",
            role: "Performs nearest-neighbor index lookup over millions of pre-indexed document chunks.",
            tech: "Pinecone / pgvector / Qdrant",
            detail: "Executes hybrid search combining sparse metadata filtering (BM25) with dense vector cosine similarity (HNSW index) in < 15ms."
          }
        },
        {
          id: "rag-llm",
          label: "Generator (LLM)",
          x: 680,
          y: 150,
          icon: "llm",
          details: {
            title: "Context Synthesis Generator",
            role: "Assembles prompt template with fetched context chunks to synthesize a grounded, accurate response.",
            tech: "Anthropic Claude 3.5 Sonnet / GPT-4o",
            detail: "Feeds structured context: 'Answer query ONLY using the provided snippets. If unsure, say I don't know.' This minimizes hallucination risk."
          }
        },
        {
          id: "rag-output",
          label: "Structured Output",
          x: 830,
          y: 150,
          icon: "output",
          details: {
            title: "Response Stream Gate",
            role: "Streams answers back to client via Server-Sent Events (SSE) while checking output safety.",
            tech: "Asynchronous HTTP/SSE Server",
            detail: "Ensures the generated content does not violate compliance policies. Converts text stream to formatted markdown chunks in real-time."
          }
        }
      ],
      connections: [
        { from: "rag-input", to: "rag-guard" },
        { from: "rag-guard", to: "rag-embed" },
        { from: "rag-embed", to: "rag-vector" },
        { from: "rag-vector", to: "rag-llm" },
        { from: "rag-llm", to: "rag-output" }
      ]
    },
    "Multi-Agent": {
      name: "Multi-Agent System",
      description: "State-preserving agentic workflow managed by a supervisor model routing tasks dynamically across specialized worker agents.",
      icon: <GitBranch className="w-5 h-5 text-accent-purple" />,
      nodes: [
        {
          id: "ma-router",
          label: "Agent Supervisor",
          x: 150,
          y: 150,
          icon: "supervisor",
          details: {
            title: "Orchestration Supervisor Node",
            role: "Acts as the state manager and task dispatcher using a central routing model.",
            tech: "LangGraph / LangChain StateGraph",
            detail: "Evaluates current execution state. Routes work to specialized agents dynamically, inspecting output before closing the state loop."
          }
        },
        {
          id: "ma-research",
          label: "Research Agent",
          x: 380,
          y: 70,
          icon: "tool",
          details: {
            title: "Web Retrieval Web Worker",
            role: "Performs real-time search, parses HTML page structures, and summarizes findings.",
            tech: "Tavily API / Puppeteer Scraper",
            detail: "Formulates optimal Google/Bing search queries based on the supervisor's command, extracts text content, and outputs clean markdown summaries."
          }
        },
        {
          id: "ma-coder",
          label: "Code Execution",
          x: 380,
          y: 150,
          icon: "code",
          details: {
            title: "Sandboxed Interpreter Worker",
            role: "Writes Python scripts, executes them in a secure container, and catches print outputs.",
            tech: "Docker / E2B Sandbox",
            detail: "Automates complex mathematics, graph plotting, and data manipulation. Returns raw logs, errors, or generated visual files securely."
          }
        },
        {
          id: "ma-writer",
          label: "Report Writer",
          x: 380,
          y: 230,
          icon: "write",
          details: {
            title: "Synthesis & Compilation Worker",
            role: "Aggregates researcher summaries and coder output into high-quality documentation.",
            tech: "Claude 3.5 Sonnet / Prompt Engineering",
            detail: "Polishes tone, formats LaTeX tables, writes Markdown files, and checks readability metrics before outputting to supervisor."
          }
        },
        {
          id: "ma-validator",
          label: "Human-in-the-Loop",
          x: 620,
          y: 150,
          icon: "human",
          details: {
            title: "Human Validation Gate",
            role: "Halts workflow execution to request human validation for high-risk operations.",
            tech: "Next.js UI Hook / Socket.IO",
            detail: "Suspends the agent's LangGraph checkpoint. Notifies the developer to approve, edit, or reject the agent's proposed commands before continuation."
          }
        },
        {
          id: "ma-memory",
          label: "State Store",
          x: 820,
          y: 150,
          icon: "db",
          details: {
            title: "LangGraph Postgres Checkpointer",
            role: "Saves agent state thread variables across turns to enable time-travel and debugging.",
            tech: "PostgreSQL Database Store",
            detail: "Serializes the current active agent memory thread. Allows developers to rewind the state to any previous node step and replay actions."
          }
        }
      ],
      connections: [
        { from: "ma-router", to: "ma-research" },
        { from: "ma-router", to: "ma-coder" },
        { from: "ma-router", to: "ma-writer" },
        { from: "ma-research", to: "ma-validator" },
        { from: "ma-coder", to: "ma-validator" },
        { from: "ma-writer", to: "ma-validator" },
        { from: "ma-validator", to: "ma-memory" }
      ]
    },
    "AI Backend": {
      name: "AI Backend (FastAPI)",
      description: "Asynchronous task routing pipeline processing model inference via background queues and Redis cache indices.",
      icon: <Cpu className="w-5 h-5 text-accent" />,
      nodes: [
        {
          id: "be-client",
          label: "Client Request",
          x: 80,
          y: 150,
          icon: "client",
          details: {
            title: "Asynchronous REST / Socket Ingest",
            role: "Receives user API calls or WebSocket streaming connections.",
            tech: "Uvicorn / FastAPI ASGI",
            detail: "Validates HTTP headers and JSON bodies asynchronously using Pydantic schemas, routing requests instantly."
          }
        },
        {
          id: "be-auth",
          label: "Security & Limit",
          x: 230,
          y: 150,
          icon: "guard",
          details: {
            title: "API Gateway Filter",
            role: "Authenticates request signature tokens and enforces tenant rate-limits.",
            tech: "PyJWT / Redis Rate Limiter",
            detail: "Applies sliding-window rate limiting. Unauthorized or flooding requests are immediately blocked at the boundary."
          }
        },
        {
          id: "be-queue",
          label: "Celery Workers",
          x: 380,
          y: 150,
          icon: "queue",
          details: {
            title: "Redis & Celery Task Queue",
            role: "Offloads heavy model prediction jobs to background worker processes.",
            tech: "Celery / Redis / RabbitMQ",
            detail: "Pushes the task metadata to a Redis broker. A worker pulls the task, preventing the client's HTTP request from timing out."
          }
        },
        {
          id: "be-engine",
          label: "ONNX Runtime",
          x: 530,
          y: 150,
          icon: "cpu",
          details: {
            title: "Accelerated Model Inference",
            role: "Runs fast local machine learning inference on GPU/CPU hardware.",
            tech: "ONNX Runtime / TensorRT / PyTorch",
            detail: "Loads optimized models (.onnx) for classification, vector search, or light translation in a highly parallel thread pool."
          }
        },
        {
          id: "be-cache",
          label: "Redis Cache",
          x: 680,
          y: 150,
          icon: "db",
          details: {
            title: "Semantic Vector Caching",
            role: "Saves previous model answers to instantly resolve duplicate user requests.",
            tech: "Redis / Semantic Cache",
            detail: "If a new prompt matches a cached prompt above 95% semantic similarity, the backend retrieves the cached output instantly."
          }
        },
        {
          id: "be-metrics",
          label: "Helicone Logs",
          x: 830,
          y: 150,
          icon: "output",
          details: {
            title: "LLM Observability Gateway",
            role: "Logs token counts, model latency, and prompt details to dashboards.",
            tech: "Helicone / LangSmith API",
            detail: "Enables production tracing, cost estimation, and logs LLM exceptions to trigger retry strategies."
          }
        }
      ],
      connections: [
        { from: "be-client", to: "be-auth" },
        { from: "be-auth", to: "be-queue" },
        { from: "be-queue", to: "be-engine" },
        { from: "be-engine", to: "be-cache" },
        { from: "be-cache", to: "be-metrics" }
      ]
    },
    "Computer Vision": {
      name: "Computer Vision",
      description: "Real-time surveillance monitoring pipeline analyzing high-frame-rate feeds for safety compliance using YOLO.",
      icon: <Eye className="w-5 h-5 text-accent-purple" />,
      nodes: [
        {
          id: "cv-stream",
          label: "RTSP Camera Ingest",
          x: 80,
          y: 150,
          icon: "video",
          details: {
            title: "Multi-Camera Streaming Ingest",
            role: "Connects to network security cameras and extracts raw image frames.",
            tech: "OpenCV / GStreamer API",
            detail: "Establishes asynchronous thread loops pulling frames from RTSP camera streams. Drops duplicate frames to preserve RAM."
          }
        },
        {
          id: "cv-pre",
          label: "Frame Processor",
          x: 230,
          y: 150,
          icon: "code",
          details: {
            title: "OpenCV Preprocessing Filter",
            role: "Resizes, filters, and standardizes camera frames before feeding ML models.",
            tech: "OpenCV / NumPy Matrix Operations",
            detail: "Applies CLAHE contrast enhancement, color channel ordering, scaling to 640x640 grid, and GPU tensor normalization."
          }
        },
        {
          id: "cv-model",
          label: "YOLOv8 Engine",
          x: 380,
          y: 150,
          icon: "cpu",
          details: {
            title: "YOLOv8 Detection Core",
            role: "Identifies bounding boxes of helmets, vests, and people in the processed frame.",
            tech: "Ultralytics YOLOv8 / CUDA Accelerated",
            detail: "Performs single-pass object detection on the GPU. Outputs confidence arrays, coordinates, and classification labels in < 12ms."
          }
        },
        {
          id: "cv-track",
          label: "ByteTrack Tracker",
          x: 530,
          y: 150,
          icon: "supervisor",
          details: {
            title: "Object Association Tracker",
            role: "Links detections across frames to assign unique IDs to moving workers.",
            tech: "ByteTrack Algorithm / Kalman Filter",
            detail: "Calculates intersection-over-union (IoU) scores. Retains tracking status even when objects are momentarily hidden by obstacles."
          }
        },
        {
          id: "cv-logic",
          label: "Safety Geofence",
          x: 680,
          y: 150,
          icon: "guard",
          details: {
            title: "Geofencing Compliance Logic",
            role: "Calculates overlap between worker coordinates and designated danger zones.",
            tech: "Python Spatial Algorithms / Shapely",
            detail: "Performs point-in-polygon tests. Triggers violation status if a worker without a safety helmet intersects a high-risk area."
          }
        },
        {
          id: "cv-alert",
          label: "WebSocket Alert",
          x: 830,
          y: 150,
          icon: "output",
          details: {
            title: "Notification Dispatcher",
            role: "Dispatches alarms and screenshots of safety violations to supervisors.",
            tech: "FastAPI / Socket.io / Twilio",
            detail: "Crops the violating image frame, encodes it as base64/S3 link, and pushes it immediately to slack webhooks or mobile dashboard apps."
          }
        }
      ],
      connections: [
        { from: "cv-stream", to: "cv-pre" },
        { from: "cv-pre", to: "cv-model" },
        { from: "cv-model", to: "cv-track" },
        { from: "cv-track", to: "cv-logic" },
        { from: "cv-logic", to: "cv-alert" }
      ]
    },
    OCR: {
      name: "OCR Document Pipeline",
      description: "Structured metadata extraction pipeline converting physical paper invoices into validated database schemas.",
      icon: <Terminal className="w-5 h-5 text-accent" />,
      nodes: [
        {
          id: "ocr-upload",
          label: "Document Upload",
          x: 80,
          y: 150,
          icon: "upload",
          details: {
            title: "Multi-Format Document Upload",
            role: "Handles PDF uploads, JPEG scans, or receipts submitted by users.",
            tech: "Next.js Multipart Form / AWS S3 API",
            detail: "Validates file type and size. Stores raw files securely in S3 and issues an processing job event trigger."
          }
        },
        {
          id: "ocr-clean",
          label: "Image Binarizer",
          x: 230,
          y: 150,
          icon: "code",
          details: {
            title: "Document Image Cleanups",
            role: "Performs deskewing, binarization, and noise cancellation to optimize OCR success.",
            tech: "OpenCV Document Filters",
            detail: "Corrects page tilt angle, applies adaptive thresholding to convert to black & white, and removes dust/line noise."
          }
        },
        {
          id: "ocr-layout",
          label: "Layout Analysis",
          x: 380,
          y: 150,
          icon: "supervisor",
          details: {
            title: "Document Layout Parsing",
            role: "Identifies reading order, column splits, tables, and signature blocks.",
            tech: "LayoutLMv3 Multimodal Model",
            detail: "Uses a spatial-textual transformer to classify document sections. Segregates header blocks, table matrices, and footers."
          }
        },
        {
          id: "ocr-raw",
          label: "Tesseract OCR",
          x: 530,
          y: 150,
          icon: "cpu",
          details: {
            title: "Raw Character Extraction",
            role: "Extracts text strings and coordinates from layout segments.",
            tech: "Tesseract OCR Engine / PyTesseract",
            detail: "Performs character segmentation. Matches visual glyphs to languages, outputting structured layout-bounding-box text blocks."
          }
        },
        {
          id: "ocr-llm",
          label: "GPT Parser",
          x: 680,
          y: 150,
          icon: "llm",
          details: {
            title: "LLM Semantic Normalizer",
            role: "Transforms raw text blocks into database schemas with structured JSON.",
            tech: "GPT-4o API / Pydantic Output Parser",
            detail: "Maps inconsistent text labels (e.g. 'Subt.', 'Net Val.', 'Amt due') into standardized fields like 'subtotal' and 'tax' using schema formatting."
          }
        },
        {
          id: "ocr-db",
          label: "DB Ingestion",
          x: 830,
          y: 150,
          icon: "db",
          details: {
            title: "Structured SQL / Mongo Storage",
            role: "Validates final metrics and saves document data to persistent tables.",
            tech: "FastAPI SQLAlchemy / MongoDB",
            detail: "Performs arithmetic checks (total == subtotal + tax). Flags mismatches for review, and writes correct invoices to the dashboard DB."
          }
        }
      ],
      connections: [
        { from: "ocr-upload", to: "ocr-clean" },
        { from: "ocr-clean", to: "ocr-layout" },
        { from: "ocr-layout", to: "ocr-raw" },
        { from: "ocr-raw", to: "ocr-llm" },
        { from: "ocr-llm", to: "ocr-db" }
      ]
    }
  };

  const getActiveNode = () => {
    const pipeline = pipelines[activePipeline];
    return pipeline.nodes.find((node) => node.id === selectedNode) || pipeline.nodes[0];
  };

  const activeNode = getActiveNode();

  return (
    <section id="lab" className="py-32 relative">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-purple">Architecture Lab</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-purple mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Click nodes in the pipelines below to explore system designs, API schemas, and technical implementation.
          </p>
        </div>

        {/* Pipeline Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {Object.keys(pipelines).map((key) => {
            const pip = pipelines[key];
            return (
              <button
                key={key}
                onClick={() => {
                  setActivePipeline(key);
                  setSelectedNode(pip.nodes[0].id);
                }}
                className={`px-5 py-3 rounded-xl flex items-center gap-2.5 text-sm font-mono border transition-all duration-300 ${
                  activePipeline === key
                    ? "bg-accent-purple/20 border-accent-purple text-white shadow-lg shadow-accent-purple/10"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-gray-300"
                }`}
              >
                {pip.icon}
                {pip.name}
              </button>
            );
          })}
        </div>

        {/* Lab Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Visual SVG Sandbox Canvas */}
          <div className="lg:col-span-2 glass-panel rounded-2xl border border-white/5 p-6 flex flex-col justify-between overflow-hidden min-h-[380px] bg-primary-bg/40 relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono tracking-wider text-accent uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-pulse text-accent" />
                Pipeline Interactive Sandbox
              </span>
              <span className="text-xs font-mono text-gray-500">
                Click nodes to inspect
              </span>
            </div>

            {/* Render Pipeline SVG */}
            <div className="w-full overflow-x-auto py-8 select-none scrollbar-none flex justify-center">
              <svg
                width="920"
                height="300"
                viewBox="0 0 920 300"
                className="overflow-visible min-w-[920px]"
              >
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#00F5D4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.4" />
                  </linearGradient>
                  
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Draw connection lines */}
                {pipelines[activePipeline].connections.map((conn, cIdx) => {
                  const fromNode = pipelines[activePipeline].nodes.find((n) => n.id === conn.from);
                  const toNode = pipelines[activePipeline].nodes.find((n) => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  return (
                    <g key={cIdx}>
                      {/* Connection path line */}
                      <path
                        d={`M ${fromNode.x} ${fromNode.y} C ${(fromNode.x + toNode.x) / 2} ${fromNode.y}, ${(fromNode.x + toNode.x) / 2} ${toNode.y}, ${toNode.x} ${toNode.y}`}
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="2.5"
                        className="animate-flow-dash"
                      />
                    </g>
                  );
                })}

                {/* Draw nodes */}
                {pipelines[activePipeline].nodes.map((node) => {
                  const isActive = selectedNode === node.id;
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => setSelectedNode(node.id)}
                      className="cursor-pointer"
                    >
                      {/* Interactive Glow Backring */}
                      <circle
                        r="32"
                        className={`transition-all duration-300 ${
                          isActive
                            ? "fill-accent/15 stroke-accent stroke-[1.5px] pulse-glow"
                            : "fill-secondary-bg/80 stroke-white/10 stroke-[1px] hover:stroke-white/30 hover:fill-secondary-bg/95"
                        }`}
                        filter={isActive ? "url(#glow)" : undefined}
                      />
                      
                      {/* Node label */}
                      <text
                        y="48"
                        textAnchor="middle"
                        className={`text-[10px] font-mono font-semibold tracking-wider transition-colors select-none ${
                          isActive ? "fill-accent font-bold" : "fill-gray-400"
                        }`}
                      >
                        {node.label}
                      </text>

                      {/* Small inner dot decorator */}
                      <circle
                        r="4"
                        className={`transition-colors duration-300 ${
                          isActive ? "fill-accent" : "fill-white/20"
                        }`}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Pipeline description */}
            <div className="border-t border-white/5 pt-4 text-xs font-sans text-gray-400 leading-relaxed max-w-2xl">
              {pipelines[activePipeline].description}
            </div>
          </div>

          {/* Details Side Panel */}
          <div className="glass-panel rounded-2xl border border-white/5 p-6 md:p-8 flex flex-col justify-between bg-primary-bg/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  {/* Title & Tag */}
                  <div className="flex items-center gap-2 text-[10px] font-mono text-accent-purple uppercase tracking-wider mb-6 pb-2 border-b border-white/5">
                    <Info className="w-4 h-4 text-accent" />
                    Node Specification
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {activeNode.details.title}
                  </h3>
                  
                  <p className="text-accent text-xs font-mono font-bold mb-6">
                    {activeNode.details.tech}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-xs uppercase font-mono font-semibold text-gray-500 mb-1.5">
                        Functional Role
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {activeNode.details.role}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-mono font-semibold text-gray-500 mb-1.5">
                        In-Depth Implementation
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {activeNode.details.detail}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-white font-semibold text-xs font-mono tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Consult on this pipeline
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
