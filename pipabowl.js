//"Where is my Pipa?!" Pipa is an abstraction for the network pipes. It doesn't belong here...

//The bowl just takes data and sends smoke to pipa filter
import { Bowl } from "./bowl.js"



var bestie = new Bowl("bestie.bowl", 'localhost', 3001)
bestie.light_up()
