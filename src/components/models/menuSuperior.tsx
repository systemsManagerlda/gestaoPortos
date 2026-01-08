/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

interface Module {
  title: string;
  description: string;
  icon: string;
  color: string;
  category?: string;
  usageCount?: number;
  lastAccess?: Date;
}

interface User {
  name?: string;
  email?: string;
}

interface MenuSuperiorProps {
  modules: Module[];
  activeModule: string;
  onModuleClick: (moduleTitle: string) => void;
  user?: User;
}

interface SlidesPerView {
  mobile: number;
  tablet: number;
  desktop: number;
}

interface CarouselConfig {
  slidesPerView: SlidesPerView;
  slideGap: number;
}

// Constantes separadas
const CAROUSEL_CONFIG: CarouselConfig = {
  slidesPerView: { mobile: 2, tablet: 3, desktop: 6 },
  slideGap: 24, // Aumentado de 16 para 24
};

const FILTER_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "frequent", label: "Favoritos" },
  { value: "recent", label: "Recentes" },
  { value: "active", label: "Ativos" },
] as const;

// Componente separado para o Card do Módulo
interface ModuleCardProps {
  module: Module;
  index: number;
  isActive: boolean;
  isFavorite: boolean;
  usageCount: number;
  shortcut: string;
  onClick: () => void;
  onToggleFavorite: (event: React.MouseEvent) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = React.memo(
  ({
    module,
    index,
    isActive,
    isFavorite,
    usageCount,
    shortcut,
    onClick,
    onToggleFavorite,
  }) => {
    const formatNumber = (num: number): string => {
      if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
      return num.toString();
    };

    return (
      <div className="relative group/card h-full overflow-visible">
        {/* Botão de favorito - Ajustado */}
        <button
          onClick={onToggleFavorite}
          className={`absolute top-0 right-0 z-20 p-1.5 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
            isFavorite
              ? "bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600"
              : "bg-white hover:bg-gray-100"
          }`}
          aria-label={
            isFavorite
              ? `Remover ${module.title} dos favoritos`
              : `Adicionar ${module.title} aos favoritos`
          }
          style={{
            transform: 'translate(0%, -0%)'
          }}
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? "text-white" : "text-gray-400"}`}
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </button>

        {/* Badge de atividade - Ajustado */}
        {isActive && (
          <div className="absolute top-0 left-0 z-10">
            <div 
              className="w-7 h-7 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse"
              style={{
                transform: 'translate(-30%, -30%)'
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
        )}

        {/* Card do Módulo - Aumentei o padding para dar mais espaço interno */}
        <button
          onClick={onClick}
          className={`w-full h-full p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 ${
            module.color
          } shadow-lg hover:shadow-xl border-2 ${
            isActive
              ? "border-blue-500 ring-4 ring-blue-100 scale-105"
              : "border-white hover:border-blue-200"
          } group-hover/card:scale-105 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-300`}
          aria-label={`Abrir módulo ${module.title}: ${module.description}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

          {/* Ícone animado - Ajustei o margin-bottom */}
          <div className="relative mb-5">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center shadow-inner">
              <span className="text-3xl drop-shadow-md transform group-hover/card:scale-110 transition-transform duration-300">
                {module.icon}
              </span>
            </div>

            {/* Contador de uso */}
            {usageCount > 0 && (
              <div
                className="absolute -bottom-1 -right-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm"
                title={`${usageCount} acessos`}
              >
                +{formatNumber(usageCount)}
              </div>
            )}
          </div>

          {/* Título e Descrição - Aumentei o espaçamento */}
          <div className="space-y-3 mb-4">
            <h3 className="text-sm font-bold text-gray-900 truncate drop-shadow-sm">
              {module.title}
            </h3>
            <p className="text-xs text-gray-700 opacity-90 line-clamp-2 min-h-[2.5rem] leading-relaxed">
              {module.description}
            </p>
          </div>

          {/* Indicador de status */}
          <div className="flex items-center justify-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-green-500 animate-pulse" : "bg-gray-300"
              }`}
            />
            <span className="text-[10px] font-medium text-gray-600">
              {isActive ? "Ativo" : "Disponível"}
            </span>
          </div>

          {/* Efeito de borda animada */}
          {isActive && (
            <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 animate-pulse pointer-events-none" />
          )}
        </button>
      </div>
    );
  }
);

ModuleCard.displayName = "ModuleCard";

// Hook personalizado para o carousel
const useCarousel = (totalSlides: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  const maxSlides = Math.max(
    0,
    totalSlides - CAROUSEL_CONFIG.slidesPerView.desktop
  );

  const scrollToSlide = useCallback((slideIndex: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.children[0]?.clientWidth || 0;
      const scrollAmount = slideIndex * (slideWidth + CAROUSEL_CONFIG.slideGap);
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (totalSlides <= CAROUSEL_CONFIG.slidesPerView.desktop) return;

    setCurrentSlide((prev) => {
      const next = Math.min(prev + 1, maxSlides);
      scrollToSlide(next);
      return next;
    });
  }, [maxSlides, scrollToSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = Math.max(prev - 1, 0);
      scrollToSlide(next);
      return next;
    });
  }, [scrollToSlide]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !carouselRef.current) return;
      e.preventDefault();
      const x = e.pageX - carouselRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      carouselRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 75) nextSlide();
    if (touchStart - touchEnd < -75) prevSlide();
  }, [nextSlide, prevSlide, touchEnd, touchStart]);

  return {
    currentSlide,
    isDragging,
    carouselRef,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    navigation: {
      nextSlide,
      prevSlide,
      scrollToSlide,
      setCurrentSlide,
    },
  };
};

// Componente para os botões de navegação
interface CarouselArrowProps {
  direction: "prev" | "next";
  onClick: () => void;
  visible: boolean;
}

const CarouselArrow: React.FC<CarouselArrowProps> = ({
  direction,
  onClick,
  visible,
}) => {
  if (!visible) return null;

  const isPrev = direction === "prev";
  const positionClass = isPrev ? "-left-4" : "-right-4";
  const iconPath = isPrev ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";

  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClass} top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-300 hidden md:flex items-center justify-center`}
      aria-label={isPrev ? "Slide anterior" : "Próximo slide"}
    >
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={iconPath}
        />
      </svg>
    </button>
  );
};

// Componente principal
function MenuSuperior({
  modules,
  activeModule,
  onModuleClick,
  user,
}: MenuSuperiorProps) {
  const [filter, setFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [usageStats, setUsageStats] = useState<Record<string, number>>({});
  const [showScrollArrows, setShowScrollArrows] = useState(false);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Inicializar favoritos e estatísticas
  useEffect(() => {
    const initialFavorites = modules.slice(0, 3).map((_, index) => index);
    setFavorites(initialFavorites);

    const stats: Record<string, number> = {};
    modules.forEach((module, index) => {
      if (index < 5) {
        stats[module.title] = Math.floor(Math.random() * 50) + 10;
      }
    });
    setUsageStats(stats);
  }, [modules]);

  // Filtrar módulos
  const filteredModules = useMemo(() => {
    let filtered = [...modules];

    switch (filter) {
      case "frequent":
        filtered = filtered.filter((_, index) => favorites.includes(index));
        break;
      case "recent":
        filtered = filtered.slice(0, Math.min(5, filtered.length));
        break;
      case "active":
        filtered = filtered.filter((module) => activeModule === module.title);
        break;
      default:
        break;
    }

    return filtered;
  }, [modules, filter, favorites, activeModule]);

  // Hook do carousel
  const {
    currentSlide,
    isDragging,
    carouselRef,
    handlers: carouselHandlers,
    navigation,
  } = useCarousel(filteredModules.length);

  // Verificar se precisa mostrar setas de navegação
  useEffect(() => {
    const checkScroll = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth } = carouselRef.current;
        setShowScrollArrows(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    const resizeObserver = new ResizeObserver(checkScroll);
    if (carouselRef.current) {
      resizeObserver.observe(carouselRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [carouselRef, filteredModules]);

  // Calcular estatísticas
  const stats = useMemo(() => {
    const activeModulesCount = modules.filter(
      (m) => activeModule === m.title
    ).length;
    const totalUsageCount = Object.values(usageStats).reduce(
      (sum, count) => sum + count,
      0
    );
    const averageUsage =
      modules.length > 0 ? Math.round(totalUsageCount / modules.length) : 0;

    return { activeModulesCount, totalUsageCount, averageUsage };
  }, [modules, activeModule, usageStats]);

  // Funções auxiliares
  const toggleFavorite = useCallback(
    (index: number, event: React.MouseEvent) => {
      event.stopPropagation();
      setFavorites((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    },
    []
  );

  const formatNumber = useCallback((num: number): string => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  }, []);

  const getModuleShortcut = useCallback((index: number): string => {
    if (index < 9) return `${index + 1}`;
    return String.fromCharCode(65 + index - 9);
  }, []);

  const getLastAccessTime = useCallback((): string => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60000);
    return fiveMinutesAgo.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, []);

  // Calcular slides totais
  const totalSlides = Math.ceil(
    filteredModules.length / CAROUSEL_CONFIG.slidesPerView.mobile
  );

  return (
    <>
      <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 border-b border-gray-300 shadow-sm text-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Cabeçalho com filtros */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">🚀</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Módulos Principais
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Arraste horizontalmente para navegar pelos módulos
                  </p>
                </div>
              </div>

              {/* Breadcrumb e indicadores */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center text-sm text-gray-500"
                >
                  <span className="hover:text-blue-600 cursor-pointer">
                    Dashboard
                  </span>
                  {activeModule && (
                    <>
                      <svg
                        className="w-4 h-4 mx-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium text-blue-600">
                        {activeModule}
                      </span>
                    </>
                  )}
                </nav>

                {/* Indicadores do carousel */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1" role="tablist">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          navigation.setCurrentSlide(i);
                          navigation.scrollToSlide(i);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentSlide === i
                            ? "bg-blue-600 w-6"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        role="tab"
                        aria-label={`Ir para slide ${i + 1}`}
                        aria-selected={currentSlide === i}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {currentSlide + 1} / {totalSlides}
                  </span>
                </div>
              </div>
            </div>

            {/* Filtros e contadores */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-300 shadow-sm">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <select
                  className="text-sm bg-transparent border-none focus:outline-none focus:ring-0"
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    navigation.setCurrentSlide(0);
                    navigation.scrollToSlide(0);
                  }}
                  aria-label="Filtrar módulos"
                >
                  {FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} (
                      {option.value === "frequent"
                        ? favorites.length
                        : option.value === "active"
                        ? stats.activeModulesCount
                        : modules.length}
                      )
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative group">
            <CarouselArrow
              direction="prev"
              onClick={navigation.prevSlide}
              visible={showScrollArrows}
            />

            <CarouselArrow
              direction="next"
              onClick={navigation.nextSlide}
              visible={showScrollArrows}
            />

            {/* Carousel */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 snap-x snap-mandatory"
              {...carouselHandlers}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
              role="region"
              aria-label="Carousel de módulos"
            >
              {filteredModules.map((module, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] xl:w-[calc(16.666%-20px)] snap-start"
                >
                  <ModuleCard
                    module={module}
                    index={index}
                    isActive={activeModule === module.title}
                    isFavorite={favorites.includes(index)}
                    usageCount={usageStats[module.title] || 0}
                    shortcut={getModuleShortcut(index)}
                    onClick={() => onModuleClick(module.title)}
                    onToggleFavorite={(e) => toggleFavorite(index, e)}
                  />
                </div>
              ))}

              {/* Aumente o espaçamento final */}
              <div className="flex-shrink-0 w-6" /> 
            </div>


            {/* Indicadores de scroll para mobile */}
            <div className="flex md:hidden items-center justify-center gap-2 mt-4">
              <button
                onClick={navigation.prevSlide}
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Slide anterior"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      currentSlide === i ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    role="presentation"
                  />
                ))}
              </div>

              <button
                onClick={navigation.nextSlide}
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Próximo slide"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .snap-x {
          scroll-snap-type: x mandatory;
        }

        .snap-start {
          scroll-snap-align: start;
        }
      `}</style>
    </>
  );
}

export default React.memo(MenuSuperior);
