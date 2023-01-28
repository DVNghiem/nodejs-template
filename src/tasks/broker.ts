import apmq, { Channel, Connection } from "amqplib";

class MessageBroker {
    connection?: Connection;
    channel?: Channel;
    exchange?: string;
    constructor() {}
    async initial() {
        this.connection = await apmq.connect(
            process.env.RABBITMQ_URL || "amqp://username:password@msg-broker:5672"
        );
        this.channel = await this.connection.createChannel();
        return this;
    }

    async publish(queue: string, data: any) {
        if (!this.connection) {
            await this.initial();
        }
        await this.channel?.assertQueue(queue, {
            durable: true,
        });
        this.channel?.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
            persistent: true,
        });
    }

    async consummer(events: Array<{queue:string, handler: CallableFunction}>){
        if (!this.connection) {
            await this.initial();
        }
        for(const item of events){
            await this.subscribe(item.queue, item.handler)
        }
    }

    private async subscribe(queue: string, handler: CallableFunction) {
        if (!this.connection) {
            await this.initial();
        }
        this.channel?.assertQueue(queue, {
            durable: true,
        });
        const self = this;
        this.channel?.consume(queue, function (msg: any) {
            handler(msg.content.toString());
            self.channel?.ack(msg);
        });
    }
}
const msgBroker = new MessageBroker();
export default msgBroker;
