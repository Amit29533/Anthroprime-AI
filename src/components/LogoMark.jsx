import React from 'react'

/**
 * The Anthroprime brand lockup — used in the header and footer.
 *
 * Renders the company mark (the white "A·P" handshake monogram on its navy
 * tile) followed by the "Anthroprime" wordmark. The mark ships on its navy
 * background so it reads cleanly on both the light and dark themes.
 *
 * Size the mark by height via `boxClassName`, e.g.
 *   <LogoMark boxClassName="h-8 w-auto" />
 * and tune the wordmark size with `textClassName`. The matching favicon
 * lives in /public/favicon.png.
 */
export default function LogoMark({ boxClassName = 'h-8 w-auto', textClassName = 'text-[18px]' }) {
  return (
    <span className="flex items-center gap-2.5 shrink-0 select-none">
      <img
        src="/logo.png"
        alt=""
        width={448}
        height={279}
        loading="eager"
        decoding="async"
        className={`${boxClassName} object-contain shrink-0`}
        draggable={false}
      />
      <span className={`font-display font-bold tracking-tight text-text leading-none whitespace-nowrap ${textClassName}`}>
        Anthroprime
      </span>
    </span>
  )
}
