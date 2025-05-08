import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"
export default function Loaders(){
    return(
        <motion.div className="inset-0 flex fixed justify-center items-center z-50 backdrop-blur-lg">
             <motion.div className="flex justify-center items-center w-20 h-20 rounded-xl opacity-100">
                <Loader2 className="size-20 animate-spin"/>
            </motion.div>
        </motion.div>
    )
}