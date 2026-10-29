import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary (marino): la acción principal, una por vista. tonal: elegir tipo. inverse: dentro de un panel. highlight (naranja): llamada destacada en marketing. */
  variant?: 'primary' | 'secondary' | 'tonal' | 'quiet' | 'inverse' | 'highlight' | 'danger';
  size?: 'm' | 's';
  /** Botón redondo solo con icono. Pon aria-label. */
  round?: boolean;
  children: ReactNode;
}

export interface TagProps {
  /** marino: materia. azul: etapa. turquesa: disponible. naranja: nuevo o destacado (uno por tarjeta). */
  tone?: 'neutral' | 'marino' | 'azul' | 'turquesa' | 'naranja';
  className?: string;
  children: ReactNode;
}

export interface AvatarProps {
  /** Nombre completo: da las iniciales, el color y la etiqueta accesible. */
  name: string;
  src?: string;
  /** s 36px, m 48px, l 64px, xl 80px. */
  size?: 's' | 'm' | 'l' | 'xl';
  /** Anillo turquesa: disponible para proyectos o contratación. */
  available?: boolean;
  className?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  hint?: string;
  /** Si hay error, sustituye a hint y marca el campo. */
  error?: string;
  /** Redondo y de 48px: solo para el campo de publicar. */
  pill?: boolean;
}

export interface SearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Nombre para el lector de pantalla. Por defecto, "Buscar". */
  label?: string;
}

export interface ProfileCardProps {
  name: string;
  /** Cargo y etapa: "Profesora de Matemáticas · ESO y Bachillerato". */
  role: string;
  /** Centro y ciudad, o "Docente libre · Ciudad". */
  place?: string;
  avatar?: string;
  /** Materias o metodologías. Máximo tres. */
  tags?: string[];
  available?: boolean;
  connected?: boolean;
  onConnect?: () => void;
  onOpen?: () => void;
  className?: string;
}

export interface ResourceCardProps {
  /** Tipo de recurso: "PDF", "Presentación", "Vídeo". */
  kind: string;
  /** "18 págs", "12 min". */
  detail?: string;
  title: string;
  author: string;
  /** La primera es la materia; el resto, etapas. */
  tags?: string[];
  downloads?: number;
  saves?: number;
  saved?: boolean;
  onSave?: () => void;
  className?: string;
}

export declare function Button(props: ButtonProps): JSX.Element;
export declare function Tag(props: TagProps): JSX.Element;
export declare function Avatar(props: AvatarProps): JSX.Element;
export declare function Input(props: InputProps): JSX.Element;
export declare function SearchField(props: SearchFieldProps): JSX.Element;
export declare function ProfileCard(props: ProfileCardProps): JSX.Element;
export declare function ResourceCard(props: ResourceCardProps): JSX.Element;

export type IconName = 'inicio' | 'buscar' | 'red' | 'conectar' | 'perfil' | 'mensajes' | 'notificaciones'
  | 'proyecto' | 'recurso' | 'empleo' | 'formacion' | 'guardar' | 'compartir' | 'megusta' | 'comentar'
  | 'calendario' | 'ubicacion' | 'descargar' | 'subir' | 'filtro' | 'ajustes' | 'mas' | 'cerrar'
  | 'check' | 'flecha' | 'menu';

export interface IconProps {
  name: IconName;
  /** 16, 20 (por defecto) o 24. */
  size?: number;
  /** Solo si el icono va sin texto al lado. */
  label?: string;
  className?: string;
}

export interface ProjectCardProps {
  title: string;
  summary?: string;
  /** La primera es la materia; el resto, etapas. */
  tags?: string[];
  /** Nombres de los centros inscritos. */
  centres?: string[];
  /** Plazas totales de centros. */
  slots?: number;
  /** "15 de noviembre". */
  deadline?: string;
  joined?: boolean;
  onJoin?: () => void;
  className?: string;
}

export interface JobCardProps {
  title: string;
  company: string;
  logo?: string;
  isNew?: boolean;
  modality?: 'Remoto' | 'Presencial' | 'Híbrido';
  tags?: string[];
  place?: string;
  hours?: string;
  /** "28 €/hora". Obligatorio para publicar. */
  pay?: string;
  /** "Hace 5 horas". */
  posted?: string;
  /** Oferta destacada: la tarjeta pasa a panel marino. Una por pantalla. */
  featured?: boolean;
  applied?: boolean;
  onApply?: () => void;
  className?: string;
}

export interface PostCardProps {
  author: string;
  role?: string;
  avatar?: string;
  /** "hace 2 h". */
  time: string;
  text: string;
  /** kind: formato corto ("PDF"). detail: "24 páginas · Tecnología · 4º ESO". */
  resource?: { kind: string; title: string; detail?: string };
  likes?: number;
  comments?: number;
  liked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  className?: string;
}

export interface EmptyStateProps {
  title: ReactNode;
  text?: string;
  /** Texto del botón primary. */
  action?: string;
  onAction?: () => void;
  className?: string;
}

export declare function Icon(props: IconProps): JSX.Element;
export declare function ProjectCard(props: ProjectCardProps): JSX.Element;
export declare function JobCard(props: JobCardProps): JSX.Element;
export declare function PostCard(props: PostCardProps): JSX.Element;
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
