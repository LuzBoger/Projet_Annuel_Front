type EventCallback = (...args: unknown[]) => void;

class EventEmitter {
    private events: Record<string, EventCallback[]> = {};

    on(event: string, listener: EventCallback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        
        return () => this.off(event, listener);
    }

    off(event: string, listenerToRemove: EventCallback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(...args));
    }
}

export const globalEvents = new EventEmitter();
