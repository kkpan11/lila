import type { BotInfo, Operator, Book } from '../types';
import type { Editor } from './editor';
import type { Pane } from './pane';
import type { ZerofishBot } from '../zerofishBot';

export interface BotInfoReader extends BotInfo {
  readonly [key: string]: any;
}

export interface ZerofishBotEditor extends ZerofishBot {
  [key: string]: any;
  disabled: Set<string>;
}

export interface EditorHost {
  readonly view: HTMLElement;
  readonly editor: Editor;
  readonly bot: ZerofishBotEditor;
  readonly defaultBot: BotInfoReader;
  readonly cleanups: (() => void)[];
  update(): void;
}

export interface PaneInfo {
  type?: AnyType;
  id?: string;
  class?: string[];
  label?: string;
  title?: string;
  required?: boolean;
  requires?: string[];
  value?: string | number | boolean | Operator | Book[];
}

export interface SelectInfo extends PaneInfo {
  type: 'select';
  value: string | undefined;
  choices: { name: string; value: string }[];
}

export interface TextareaInfo extends PaneInfo {
  type: 'textarea';
  value: string;
  rows?: number;
}

export interface RangeInfo extends PaneInfo {
  type: 'range';
  value: number;
  min: number;
  max: number;
  step: number;
}

export interface NumberInfo extends PaneInfo {
  type: 'number';
  value: number;
  min: number;
  max: number;
}

export interface TextInfo extends PaneInfo {
  type: 'text';
  value: string;
}

export interface BooksInfo extends PaneInfo {
  type: 'books';
  value: Book[];
  choices: { name: string; value: string }[];
  min: number;
  max: number;
}

export interface OperatorInfo extends PaneInfo {
  type: 'operator';
  value: Operator;
}

export type AnyType =
  | 'group'
  | 'books'
  | 'operator'
  | 'radioGroup'
  | 'toggle'
  | 'select'
  | 'text'
  | 'textarea'
  | 'range'
  | 'number';

export type AnyKey =
  | keyof SelectInfo
  | keyof TextInfo
  | keyof TextareaInfo
  | keyof RangeInfo
  | keyof NumberInfo
  | keyof BooksInfo
  | keyof OperatorInfo;

export type AnyInfo =
  | SelectInfo
  | TextInfo
  | TextareaInfo
  | RangeInfo
  | NumberInfo
  | BooksInfo
  | OperatorInfo
  | AnyInfo[];

export interface Schema extends PaneInfo {
  [key: string]: AnyInfo | Schema | PropertyValue;
  type?: undefined | 'radioGroup' | 'group';
}

export type PaneArgs = { host: EditorHost; info: PaneInfo; parent?: Pane };

export type ObjectSelector = 'bot' | 'default' | 'schema';

type PropertyValue = string | number | boolean | Operator | Book[] | PropertyValue[] | undefined;
