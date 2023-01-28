import msgBroker from "./broker"
import UserTask from "./user"
msgBroker.consummer(
    [
        {
            queue: "register",
            handler: UserTask.register
        },
    ]
)
