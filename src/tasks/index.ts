import msgBroker from "./broker"
import HelloTask from "./user"
msgBroker.subscribe('register', HelloTask.register)
export default msgBroker
