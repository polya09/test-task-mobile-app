function Swatch({ bg, ink, name, hex, role, border, small, macro }) {
  const classes = ['swatch', border && 'swatch--bordered', small && 'swatch--sm'].filter(Boolean)
  return (
    <div
      className={classes.join(' ')}
      style={{ background: bg, color: ink, flex: '1 1 0' }}
    >
      {role && <span className="swatch__role">{role}</span>}
      {macro && <span className="swatch__macro">{macro}</span>}
      <span className="swatch__name" style={small ? { fontSize: 23 } : undefined}>
        {name}
      </span>
      <span className="swatch__hex tnum" style={small ? { fontSize: 20 } : undefined}>
        {hex}
      </span>
    </div>
  )
}

const G = 'var(--k-graphite)'
const P = 'var(--k-paper)'

export default function Colour() {
  return (
    <div>
      <h2 className="sc-label">Colour system</h2>

      <div style={{ display: 'flex', gap: 20, height: 360, marginTop: 32 }}>
        <Swatch bg="#C6F432" ink={G} name="Electric lime" hex="#C6F432" role="Brand · action" />
        <Swatch bg="#1C1F23" ink={P} name="Graphite" hex="#1C1F23" role="Structure" />
      </div>

      <div style={{ display: 'flex', gap: 12, height: 150, marginTop: 20 }}>
        <Swatch bg="#F7F5EF" ink={G} name="Warm paper" hex="#F7F5EF" border small />
        <Swatch bg="#FFFFFF" ink={G} name="Surface" hex="#FFFFFF" border small />
        <Swatch bg="#6B6F76" ink={P} name="Muted text" hex="#6B6F76" small />
        <Swatch bg="#E5E7E3" ink={G} name="Border" hex="#E5E7E3" border small />
      </div>

      <div style={{ display: 'flex', gap: 20, height: 210, marginTop: 20 }}>
        <Swatch bg="#C6F432" ink={G} name="Protein" hex="#C6F432" macro="P" small />
        <Swatch bg="#FFA62B" ink={G} name="Carbohydrates" hex="#FFA62B" macro="C" small />
        <Swatch bg="#8FD0F7" ink={G} name="Fat" hex="#8FD0F7" macro="F" small />
      </div>

      <div style={{ display: 'flex', gap: 20, height: 110, marginTop: 20 }}>
        <Swatch bg="#557A00" ink={P} name="Deep lime" hex="#557A00" />
        <Swatch bg="#FF5A4E" ink={G} name="Signal coral" hex="#FF5A4E" />
      </div>

      <p className="colour-note" style={{ marginTop: 26 }}>
        Graphite ink on lime, amber and blue. Never white.
      </p>
    </div>
  )
}
