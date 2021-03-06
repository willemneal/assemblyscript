import { ASImport } from "./ASImport";
export declare class Host extends ASImport {
    static stdout: (out: string | number) => void;
    debug(): void;
    _log(start: number, sizeof: number): void;
    _log_str(x: number): void;
    _logi(x: number): void;
    _logf(x: number): void;
}
