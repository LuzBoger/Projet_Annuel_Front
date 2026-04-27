export interface ApiResponse {
  message: string;
}

export interface ErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}
