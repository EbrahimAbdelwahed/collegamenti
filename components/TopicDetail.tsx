import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { GraphNode, Subject, Topic } from '../types';
import { CloseIcon, LightbulbIcon, BookOpenIcon, SparklesIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from './Icons';

interface TopicDetailProps {
  node: GraphNode | null;
  onClose: () => void;
}

const getCommissionTypeClasses = (type: Subject['commission_type']) => {
  switch (type) {
    case 'Commissario Interno':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    case 'Commissario Esterno':
      return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
    case 'Commissario Interno e Esterno':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
  }
};

const MOBILE_BREAKPOINT = 767; // pixels

const TopicDetail: React.FC<TopicDetailProps> = ({ node, onClose }) => {
  const [width, setWidth] = useState(window.innerWidth / 2.5);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);
  const panelRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    isResizing.current = true;
  };

  const handleMouseUp = useCallback(() => {
    if (isMobile) return;
    isResizing.current = false;
  }, [isMobile]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isMobile || !isResizing.current || !panelRef.current) return;

    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 400 && newWidth < window.innerWidth * 0.8) {
      setWidth(newWidth);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      isResizing.current = false; // Ensure resizing stops if screen becomes mobile
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, isMobile]);

  const isTopic = node?.type === 'topic';
  const data = node?.data as Topic | Subject | undefined;

  const panelStyle = {
    width: node ? (isMobile ? '100%' : `${width}px`) : '0px',
  };

  return (
    <div
      ref={panelRef}
      style={panelStyle}
      className={`absolute top-0 right-0 h-full bg-slate-900/80 backdrop-blur-lg shadow-2xl shadow-black/30 transform transition-transform duration-500 ease-in-out z-30 flex flex-col ${
        node ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {!isMobile && (
        <div
          onMouseDown={handleMouseDown}
          className="absolute left-0 top-0 h-full w-2 cursor-ew-resize z-40 group"
          title="Ridimensiona pannello"
        >
          <div className="w-0.5 h-full bg-slate-600/50 group-hover:bg-cyan-400 transition-colors mx-auto"></div>
        </div>
      )}
      
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full p-2 transition-colors z-50"
        aria-label="Chiudi dettagli"
      >
        <CloseIcon />
      </button>

      {data && (
        <div className="p-8 pt-16 h-full overflow-y-auto w-full">
          {isTopic ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold uppercase tracking-wider text-rose-400">Tema Principale</span>
                <h2 className="text-3xl font-bold text-white">{(data as Topic).title}</h2>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-5 ring-1 ring-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-rose-400" />
                  <h3 className="text-lg font-semibold text-slate-200">Introduzione</h3>
                </div>
                <p className="text-slate-300 font-light leading-relaxed">{(data as Topic).introduction}</p>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-5 ring-1 ring-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <DocumentTextIcon className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-slate-200">Testo di Riferimento</h3>
                </div>
                <p className="text-slate-300 font-light leading-relaxed">{(data as Topic).prompt_text}</p>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-5 ring-1 ring-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <SparklesIcon className="w-6 h-6 text-amber-400" />
                  <h3 className="text-lg font-semibold text-slate-200">Conclusione</h3>
                </div>
                <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-headings:text-slate-100 prose-strong:text-slate-100 prose-strong:font-semibold prose-blockquote:border-l-amber-400 prose-blockquote:text-slate-400 prose-ul:list-disc prose-li:text-slate-300 prose-li:my-2">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                    >
                        {(data as Topic).conclusion}
                    </ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full self-start border ${getCommissionTypeClasses((data as Subject).commission_type)}`}>
                  {(data as Subject).commission_type || 'Collegamento'}
                </span>
                <h2 className="text-3xl font-bold text-white">{(data as Subject).name}</h2>
              </div>
              
              {(data as Subject).connection_to_prompt && (
                <div className="bg-slate-800/50 rounded-xl p-5 ring-1 ring-slate-700">
                  <div className="flex items-center gap-3 mb-3">
                    <LightbulbIcon className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-slate-200">Collegamento al Tema</h3>
                  </div>
                  <p className="text-slate-300 font-light leading-relaxed">{(data as Subject).connection_to_prompt}</p>
                </div>
              )}

              <div className="bg-slate-800/50 rounded-xl p-5 ring-1 ring-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpenIcon className="w-6 h-6 text-violet-400" />
                  <h3 className="text-lg font-semibold text-slate-200">Approfondimento</h3>
                </div>
                <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-headings:text-slate-100 prose-strong:text-slate-100 prose-strong:font-semibold prose-blockquote:border-l-violet-400 prose-blockquote:text-slate-400 prose-ul:list-disc prose-li:text-slate-300 prose-li:my-2">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                    >
                        {(data as Subject).content}
                    </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopicDetail;