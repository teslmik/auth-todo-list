import { ButtonType, TabsName } from '../enums';

export const buttonGroupData: { label: string; value: ButtonType }[] = [
  { label: TabsName.ALL, value: ButtonType.ALL },
  { label: TabsName.PRIVATE, value: ButtonType.PRIVATE },
  { label: TabsName.PUBLIC, value: ButtonType.PUBLIC },
  { label: TabsName.COMPLETED, value: ButtonType.COMPLETED }
];
