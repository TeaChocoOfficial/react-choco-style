//-Path: "lib/src/config/debug.ts"
import { Temp } from '../temp/temp';
import { Ary, Obj } from '@teachoco-dev/cli';

export default class Debug {
    private static get _canLog(): boolean {
        return process?.env?.NODE_ENV === 'development' || Temp.debug;
    }

    private static get _getFileInfo(): string[] {
        const stack = new Error().stack?.split('\n').slice(2) || [];
        const fileInfo = stack
            .map((line) => {
                const match =
                    line.match(/\((.*):(\d+):(\d+)\)/) ||
                    line.match(/at (.*):(\d+):(\d+)/);
                return match ? `${match[1]}:${match[2]}` : null;
            })
            .filter(
                (info, index): info is string => info !== null && index > 1,
            );
        return fileInfo.length ? fileInfo : ['Unknown'];
    }

    private static _console(
        {
            check,
            index = 0,
            key = 'debug',
            title = 'DEBUG',
        }: {
            check?: boolean;
            title?: string;
            index?: number | null;
            key?: 'log' | 'warn' | 'error' | 'info' | 'debug' | 'table';
        },
        ...message: any[]
    ): void {
        if (check && !this._canLog) return;
        const processedMessages = message.map((msg) =>
            typeof msg === 'string' && msg === '\n' ? `\n[${title}]` : msg,
        );
        console[key](
            `[${title}]`,
            index === null
                ? `\n\n${this._getFileInfo.join(',\n')}\n\n`
                : this._getFileInfo[index],
            ...processedMessages,
        );
    }

    static setDebug(debug: boolean): void {
        Temp.debug = debug;
        console.info('[DEBUG] set debug to', debug);
    }

    static Fdlog(...message: any[]): void {
        this._console({}, ...message);
    }

    static dlog(...message: any[]): void {
        this._console({ check: true }, ...message);
    }

    static Ffile(...message: any[]): void {
        this._console({ index: null }, ...message);
    }

    static file(...message: any[]): void {
        this._console({ check: true, index: null }, ...message);
    }

    static Fif(condition?: boolean | string[], ...message: any[]): void {
        if (condition) this._console({}, ...message);
    }

    static if(condition?: boolean | string[], ...message: any[]): void {
        if (condition) this._console({ check: true }, ...message);
    }

    static Fdebug(
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

    static debug(
        condition: string[] | boolean | undefined,
        title: string,
        data: { [key: string]: unknown },
    ) {
        if (
            condition === true ||
            (Ary.is(condition) && condition.includes(title))
        ) {
            const messages = Obj.map(data, (value, key) => [key, value]);
            const newMessages = messages.flatMap((item, index) =>
                index < messages.length - 1 ? [item, '\n'] : [item],
            );
            this._console(
                { check: true },
                '\n',
                '\n',
                title,
                '\n',
                '\n',
                ...newMessages,
            );
        }
    }

    static Ferr(...message: any[]) {
        this._console(
            { index: null, key: 'error', title: 'ERROR' },
            ...message,
        );
    }

    static err(...message: any[]) {
        this._console(
            { index: null, key: 'error', title: 'ERROR' },
            ...message,
        );
    }
}
