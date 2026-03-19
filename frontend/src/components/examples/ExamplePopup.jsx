
import { AlgorithmDefinition } from "../../algorithms/definitions"
import '../../styles/Example.css'

export default function ExamplePopup({ algorithm, onClose }){

    const Example = AlgorithmDefinition[algorithm].ExampleContent

    return(
        <div className="modal-overlay">
            <div className="modal-content">

                <button
                    className="btn-close"
                    onClick={onClose}
                />

                <Example/>

            </div>
        </div>
    )
}