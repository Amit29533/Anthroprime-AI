import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { Reveal } from './ui'
import { useMotionSettings } from './MotionSettings'

const questions = [
  {
    title: 'Do I need a GPU, or a complete cluster?',
    answer: (
      <>
        A single GPU or node can serve many experiments and inference workloads.
        Larger training jobs may need multiple nodes, fast networking, shared
        storage, and orchestration. Start with the model and workload, then
        design the environment.{' '}
        <Link to="/gpu-lab#architecture">Explore the building blocks.</Link>
      </>
    )
  },
  {
    title: 'Why does GPU memory matter so much for AI?',
    answer: (
      <>
        Model weights and runtime data need space. Memory capacity determines
        what can be held; bandwidth affects how quickly data can move. A model’s
        weight size alone does not describe its full memory requirement.{' '}
        <Link to="/gpu-lab#memory">Try the model-memory explorer.</Link>
      </>
    )
  },
  {
    title: 'What changes between training and inference?',
    answer: (
      <>
        Training learns by computing predictions, gradients, and parameter
        updates. Inference uses model parameters to produce outputs. Their
        memory, latency, and throughput requirements differ.{' '}
        <Link to="/gpu-lab#workflows">Follow both workflows step by step.</Link>
      </>
    )
  },
  {
    title: 'Does adding more GPUs always make a workload faster?',
    answer: (
      <>
        No. The work must be partitioned effectively, and communication between
        GPUs adds overhead. Data loading, memory bandwidth, or serial steps can
        become bottlenecks.{' '}
        <Link to="/gpu-lab#parallel">
          Experiment with independent and chained tasks.
        </Link>
      </>
    )
  },
  {
    title: 'What should I include in a capacity request?',
    answer: (
      <>
        Share your model or application, GPU quantity if known, preferred
        region, project duration, and deployment needs. If you are still
        exploring, tell us your goals and we will work through the configuration
        with you. <Link to="/find-capacity">Build your capacity brief.</Link>
      </>
    )
  }
]

export default function GpuFaq() {
  const [open, setOpen] = useState(0)
  const { paused } = useMotionSettings()
  return (
    <section className="section gpu-faq">
      <div className="wrap faq-layout">
        <Reveal>
          <div className="eyebrow mono">Good questions. Clearer decisions.</div>
          <h2 className="editorial-title">
            A little clarity.
            <br />
            <em>A lot more possibility.</em>
          </h2>
          <p className="faq-intro">
            The questions behind a well-designed AI environment. Start here,
            then take a closer look in the GPU Lab.
          </p>
        </Reveal>
        <div className="faq-list">
          {questions.map((q, i) => (
            <div className="faq-item" key={q.title}>
              <h3>
                <button
                  id={`faq-question-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {q.title}
                  {open === i ? <Minus size={17} /> : <Plus size={17} />}
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: paused ? 0 : 0.3,
                      ease: [0.2, 0.6, 0.3, 1]
                    }}
                  >
                    <div>{q.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
