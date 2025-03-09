export type ExecuteInput = {
  readonly title?: string;
  readonly description?: string;
  readonly pagination?: {
    readonly take?: number;
    readonly skip?: number;
  };
};
