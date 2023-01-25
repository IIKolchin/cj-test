import { FormEvent, ReactNode } from 'react';

export type TFolder = {
  id: string;
  title: string;
  children?: TFolder[];
};

export type TFoldersProps = {
  children?: TFolder[];
  title?: string;
  id?: string;
  depth?: number;
};

export type TmodalProps = {
  heading?: string;
  handleHide: () => void;
  children: ReactNode;
  img: ReactNode;
};

export type TAddProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  value: string;
  placeholder?: string;
  name?: string;
};

export type TDeleteProps = {
  onClickCancel: () => void;
  onClickDelete: () => void;
  folderName: string;
};

export interface TItemProps {
  active: boolean;
}

export interface TChildProps {
  active: boolean;
  depth: number;
}
