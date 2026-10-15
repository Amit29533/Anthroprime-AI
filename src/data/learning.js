export const LEARNING_SOURCES = [
  {
    label: 'NVIDIA · CUDA programming guide',
    url: 'https://docs.nvidia.com/cuda/cuda-programming-guide/'
  },
  {
    label: 'NVIDIA · Inside Hopper',
    url: 'https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/'
  },
  {
    label: 'Hugging Face · Memory estimation',
    url: 'https://huggingface.co/docs/accelerate/usage_guides/model_size_estimator'
  },
  {
    label: 'Hugging Face · KV cache',
    url: 'https://huggingface.co/docs/transformers/kv_cache'
  }
]

export const GPU_PARTS = [
  {
    id: 'compute',
    number: '01',
    title: 'Compute engines',
    label: 'Do the math.',
    body: 'Streaming multiprocessors execute many threads. Tensor Cores accelerate supported matrix operations used throughout deep learning.',
    why: 'More compute helps when the workload can keep those engines busy.',
    signal: 'Many operations, together',
    source: 1
  },
  {
    id: 'memory',
    number: '02',
    title: 'High-bandwidth memory',
    label: 'Keep the work close.',
    body: 'HBM stores model weights, activations, and working data close to the processor. Capacity describes how much fits; bandwidth describes how quickly data moves.',
    why: 'A powerful processor can still wait on memory. Capacity and bandwidth answer different questions.',
    signal: 'Capacity ≠ bandwidth',
    source: 1
  },
  {
    id: 'fabric',
    number: '03',
    title: 'GPU interconnect',
    label: 'Let GPUs collaborate.',
    body: 'Multi-GPU workloads exchange data between accelerators. Interconnects such as NVLink support that communication; the host interface connects the GPU to the wider system.',
    why: 'Distributing a model also introduces communication. Extra GPUs do not make that overhead disappear.',
    signal: 'Compute needs communication',
    source: 1
  },
  {
    id: 'system',
    number: '04',
    title: 'The surrounding system',
    label: 'Build beyond the chip.',
    body: 'CPUs, storage, networking, power, and cooling support the GPU. A deployment needs the whole system to work together.',
    why: 'A fast accelerator is one part of a balanced infrastructure design.',
    signal: 'One chip. A complete system.',
    source: 0
  }
]

export const PRECISIONS = [
  { id: 'fp32', label: 'FP32', bits: 32, note: '4 bytes per parameter' },
  { id: 'bf16', label: 'BF16 / FP16', bits: 16, note: '2 bytes per parameter' },
  {
    id: 'int8',
    label: '8-bit',
    bits: 8,
    note: '1 byte per parameter, before metadata'
  },
  {
    id: 'int4',
    label: '4-bit',
    bits: 4,
    note: '0.5 bytes per parameter, before metadata'
  }
]

// Educational model-weight storage only. Decimal GB; excludes all runtime state.
export function weightMemoryGB(parametersB, bits) {
  if (
    !Number.isFinite(parametersB) ||
    parametersB <= 0 ||
    ![4, 8, 16, 32].includes(bits)
  )
    throw new RangeError(
      'Use a positive parameter count and a supported precision.'
    )
  return (parametersB * bits) / 8
}

// A deliberately abstract scheduler, not a hardware performance model.
export function completedTasks(step, workers, total = 32, dependent = false) {
  if (
    ![step, workers, total].every(Number.isInteger) ||
    step < 0 ||
    workers < 1 ||
    total < 1
  )
    throw new RangeError(
      'Use nonnegative steps and positive worker and task counts.'
    )
  return Math.min(total, step * (dependent ? 1 : workers))
}

export const PIPELINES = {
  training: [
    {
      title: 'Prepare data',
      detail: 'Clean and tokenize examples, then form batches for the model.',
      tag: 'Data → batches'
    },
    {
      title: 'Forward pass',
      detail: 'Run inputs through the model to produce predictions and a loss.',
      tag: 'Inputs → prediction'
    },
    {
      title: 'Backward pass',
      detail:
        'Compute gradients that describe how the loss changes with the parameters.',
      tag: 'Loss → gradients'
    },
    {
      title: 'Update weights',
      detail:
        'The optimizer uses gradients to update model parameters. Repeat over more data.',
      tag: 'Gradients → learning'
    }
  ],
  inference: [
    {
      title: 'Tokenize input',
      detail: 'Convert the prompt into tokens the model can process.',
      tag: 'Prompt → tokens'
    },
    {
      title: 'Process context',
      detail:
        'Run the prompt through the model. For autoregressive transformers, build the KV cache.',
      tag: 'Context → cached state'
    },
    {
      title: 'Decode a token',
      detail:
        'Use the current context to produce a next-token distribution and select a token.',
      tag: 'Context → next token'
    },
    {
      title: 'Continue or finish',
      detail:
        'Append the token and repeat decoding until the stopping condition is reached.',
      tag: 'Token → response'
    }
  ]
}

export const KNOWLEDGE_CHECK = [
  {
    question:
      'A model’s weights fit in GPU memory. Is that enough to guarantee it will run?',
    options: [
      'Yes, weights are the entire memory footprint.',
      'No, runtime memory is needed too.',
      'Only the number of cores matters.'
    ],
    correct: 1,
    explanation:
      'Weights are just the starting point. Cache, activations, temporary buffers, and framework allocations also need room.'
  },
  {
    question:
      'Which workload benefits most from this parallel scheduling example?',
    options: [
      'Tasks that must wait on the previous result.',
      'Independent pieces of the same computation.',
      'A workload with no data to process.'
    ],
    correct: 1,
    explanation:
      'Independent tasks can run together. Dependencies limit how much work can happen at once.'
  },
  {
    question: 'What does memory bandwidth describe?',
    options: [
      'How much data memory can hold.',
      'How quickly data can move to and from memory.',
      'The number of model parameters.'
    ],
    correct: 1,
    explanation:
      'Capacity is the size of the workspace. Bandwidth is the rate at which data moves through it.'
  }
]
