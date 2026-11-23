// Lien externe qui s'ouvre dans un nouvel onglet
export default function Ext({ href, children, className = '', ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  )
}
