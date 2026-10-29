import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary (marino): la acción principal, una por vista. highlight (naranja): llamada destacada en marketing. */
  variant?: 'primary' | 'secondary' | 'quiet' | 'highlight' | 'danger';
  size?: 'm' | 's';
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
  size?: 's' | 'm' | 'l';
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
export declare function ProfileCard(props: ProfileCardProps): JSX.Element;
export declare function ResourceCard(props: ResourceCardProps): JSX.Element;
