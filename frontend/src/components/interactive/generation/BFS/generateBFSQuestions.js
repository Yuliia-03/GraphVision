import { questionTemplates } from "../../questions/BFSQuestions"

export default function generateBFSQuestions(steps) {

    const questions = []

    const template = (id) =>
        questionTemplates.find(q => q.id === id)

    const lastPicked = {
        before: null,
        after: null
    }

    const pick = (arr, phase) => {

        let candidates = arr

        if(lastPicked[phase] !== null){
            candidates = arr.filter(q => q !== lastPicked[phase])
        }

        const choice = candidates[Math.floor(Math.random()*candidates.length)]

        lastPicked[phase] = choice

        return choice
    }

    const build = (stepIndex,id,data={}) => {

        const t = template(id)
        if(!t) return

        let text = t.text
        let hint = t.hint 

        Object.entries(data).forEach(([k, v]) => {
            text = text.replaceAll(`{${k}}`, v)
            hint = hint?.replaceAll(`{${k}}`, v)
        })

        // Object.entries(data).forEach(([k,v])=>{
        //     text = text.replace(`{extra}`,v)
        // })
        Object.entries(data).forEach(([k,v])=>{
            text = text.replaceAll(`{queue}`,steps[stepIndex-1].inQueue)
            hint = hint.replaceAll(`{queue}`,steps[stepIndex-1].inQueue)
        })

        questions.push({
            stepIndex,
            id,
            text,
            data,
            hint
        })
    }

    // init
    const init = steps.findIndex(s =>
        s.message.startsWith("Initialize")
    )

    if(init !== -1){

        const start = steps[init].inQueue?.[0]

        const qid = pick([1,2,5], "before")
        build(init+1,qid,{node:start})
    }


    for(let i=0; i<steps.length; i++){

        const pop_step = steps[i]
        const pre_pop_step = steps[i-1]

        if(!pop_step.message?.startsWith("Pop"))
            continue

        const node = pop_step.current

        if(i !== 1){

            if (!pre_pop_step.message?.startsWith("Pop")){
                const before_pop_question = pick([3,5,7], "before")
                build(i,before_pop_question,{node: pre_pop_step.current})
            }

            const after_pop_question = pick([1,2,4], "after")
            build(i+1,after_pop_question,{node})
        }
    }


    // final question
    const finalIndex = steps.findIndex(s => s.isFinal)

    if(finalIndex !== -1)
        build(finalIndex,6)

    return questions
}