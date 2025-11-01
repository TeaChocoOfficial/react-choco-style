//-Path: "react-choco-style/lib/src/config/debug.ts"
import { Temp } from '../temp/temp';
import { Ary, Obj } from '@teachoco-dev/cli';

export default class Debug {
    private static get _canLog() {
        return Temp.debug;
    }

    private static get _getFileInfo(): string[] {
        const stack = new Error().stack;
        if (!stack) return ['Unknown'];

        // แยก stack trace เป็น array และข้ามบรรทัดแรก (Error)
        const stackLines = stack.split('\n').slice(2); // ข้าม Error และบรรทัดของ _getFileInfo

        // สร้าง array ของ file:line
        const fileInfo: string[] = stackLines
            .map((line) => {
                const match =
                    line.match(/\((.*):(\d+):(\d+)\)/) ||
                    line.match(/at (.*):(\d+):(\d+)/);
                return match ? `${match[1]}:${match[2]}` : null;
            })
            .filter(
                (info, index): info is string => info !== null && index > 1,
            );

        return fileInfo.length > 0 ? fileInfo : ['Unknown'];
    }
    private static _console(
        {
            index = 0,
            key = 'debug',
            title = 'DEBUG',
        }: {
            title?: string;
            index?: number | null;
            key?: 'log' | 'warn' | 'error' | 'info' | 'debug' | 'table';
        },
        ...message: any[]
    ): void {
        if (!this._canLog) return;
        // รวม message เป็น string และตรวจสอบ \n
        const processedMessages = message.map((msg) => {
            // ถ้ามี \n ในข้อความ ให้แยกและแทรก [title] หลัง \n
            if (typeof msg === 'string' && msg === '\n') return `\n[${title}]`;
            return msg;
        });
        // Log ข้อความพร้อมตำแหน่งไฟล์
        console[key](
            `[${title}]`,
            index === null
                ? `\n\n${this._getFileInfo.join(',\n')}\n\n`
                : this._getFileInfo[index],
            ...processedMessages,
        );
    }

    static setDebug(debug: boolean): void {
        console.info('[DEBUG] set debug to', debug);
        Temp.debug = debug;
    }

    static dlog(...message: any[]): void {
        this._console({}, ...message);
    }
    static file(...message: any[]): void {
        this._console({ index: null }, ...message);
    }

    static if(condition?: boolean | string[], ...message: any[]): void {
        if (condition) this._console({}, ...message);
    }
    static debug(
        condition: string[] | boolean | undefined,
        title: string,
        data: { [key: string]: unknown },
    ) {
        if (
            condition === true ||
            (Ary.is(condition) && condition.find((key) => key === title))
        ) {
            const messages = Obj.map(data, (value, key) => [key, value]);
            const newMessages = messages.flatMap((item, index) =>
                index < messages.length - 1 ? [item, '\n'] : [item],
            );
            this._console({}, '\n', '\n', title, '\n', '\n', ...newMessages);
        }
    }
    static err(...message: any[]) {
        this._console(
            {
                index: null,
                key: 'error',
                title: 'ERROR',
            },
            ...message,
        );
    }
}
