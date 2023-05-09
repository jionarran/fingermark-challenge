class HandleError {
  public readonly msg: string;
  public readonly status_code: number;

  constructor(message: string, status_code = 400) {
    this.msg = message;
    this.status_code = status_code;
  }
}
export default HandleError;
