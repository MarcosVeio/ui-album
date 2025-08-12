export interface DashboardLayoutProps {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly menuItems?: {
    label: string;
    icon?: React.ReactNode;
    path: string;
  }[];
  readonly headerContent?: React.ReactNode;
}
