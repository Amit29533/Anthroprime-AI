import React from 'react'
export default function LogoMark() {
  return (
    <span className="brand">
      <span className="brand-icon">
        <img src="/logo.png" alt="" width="38" height="31" />
      </span>
      <span>
        <span className="brand-name">
          Anthro<em>Prime</em>
        </span>
        <span className="brand-caption">AI infrastructure · Human first</span>
      </span>
    </span>
  )
}
