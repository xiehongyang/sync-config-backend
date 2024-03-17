

export interface IndexCondition {
  pageIndex?: number;
  pageSize?: number;
  select?: string | string[];
  populate?: { path?: string; select?: string; } | string;
  customSort?: Record<string, any>;
  find?: Record<string, any>;
}