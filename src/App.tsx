import { useState, type FormEvent } from 'react'
import { isSupabaseConfigured, supabase } from './lib/supabase'

const services = [
  ['01', 'Consultoría en SG-SST', 'Diseño, implementación y mejora de sistemas que convierten el cumplimiento en gestión útil.'],
  ['02', 'Capacitaciones en SST', 'Formación práctica y comprensible para fortalecer competencias y cultura preventiva.'],
  ['03', 'Trabajo seguro en alturas', 'Entrenamiento y acompañamiento para planear y ejecutar tareas críticas con seguridad.'],
  ['04', 'Inspecciones de seguridad', 'Identificación de peligros y acciones de mejora claras, priorizadas y aplicables.'],
  ['05', 'Investigación de incidentes', 'Análisis de causas para aprender de los eventos y prevenir su repetición.'],
  ['06', 'Seguridad vial', 'Orientación para gestionar riesgos viales dentro y fuera de la operación.'],
  ['07', 'IA aplicada a SST', 'Herramientas digitales que hacen más ágil el análisis y más clara la comunicación.'],
]

const serviceOptions = [
  'Asesoría en Seguridad y Salud en el Trabajo', 'Capacitaciones en SST', 'Trabajo seguro en alturas',
  'Inspecciones de seguridad', 'Seguridad vial', 'Desarrollo de soluciones con inteligencia artificial', 'Otro',
]

const credentials = [
  ['2013', 'Tecnólogo en Salud Ocupacional'], ['2019', 'Profesional en Gestión de la Seguridad y Salud Laboral'],
  ['2019', 'Licencia vigente como profesional SST'], ['2026', 'Entrenador de trabajo en alturas'],
  ['Actual', 'Análisis y Desarrollo de Software'], ['Actual', 'Formación en inteligencia artificial'],
  ['B1', 'Inglés en formación'],
]

type FormStatus = { type: 'idle' | 'success' | 'error'; message: string }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' })

  const closeMenu = () => setMenuOpen(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    setSending(true)
    setStatus({ type: 'idle', message: '' })

    try {
      if (!isSupabaseConfigured) {
        setStatus({ type: 'error', message: 'El sistema de contacto no está disponible en este momento. Por favor, contáctame directamente por email o teléfono.' })
        return
      }
      if (!supabase) throw new Error('Supabase client is not initialized')
      const { error } = await supabase.from('contact_requests').insert({
        name: String(data.get('name')).trim(),
        company: String(data.get('company')).trim() || null,
        email: String(data.get('email')).trim(),
        phone: String(data.get('phone')).trim() || null,
        service: String(data.get('service')),
        message: String(data.get('message')).trim(),
        data_consent: data.get('data_consent') === 'on',
      })
      if (error) throw error
      form.reset()
      setStatus({ type: 'success', message: '¡Gracias por contactarme! Tu información fue registrada correctamente. Me comunicaré contigo para conocer mejor tu necesidad.' })
    } catch (error) {
      console.error('No fue posible registrar la solicitud de contacto:', error)
      setStatus({ type: 'error', message: 'No fue posible enviar tu solicitud en este momento. Conservamos los datos que escribiste; por favor, inténtalo de nuevo.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir al inicio"><span>JCP</span><div>Julio César Porras<small>Seguridad · Formación · Tecnología</small></div></a>
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>Menú <span>{menuOpen ? '×' : '☰'}</span></button>
        <nav id="main-nav" className={menuOpen ? 'open' : ''} aria-label="Navegación principal">
          <a onClick={closeMenu} href="#perfil">Perfil</a><a onClick={closeMenu} href="#servicios">Servicios</a>
          <a onClick={closeMenu} href="#experiencia">Experiencia</a><a onClick={closeMenu} href="#proyectos">Proyectos</a>
          <a onClick={closeMenu} className="nav-cta" href="#contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Seguridad y Salud en el Trabajo</p>
            <h1>Prevenir mejor.<br />Formar con propósito.<br /><em>Innovar con sentido.</em></h1>
            <p className="hero-lead">Ayudo a empresas y equipos de trabajo a prevenir riesgos, fortalecer sus competencias y mejorar la gestión de la Seguridad y Salud en el Trabajo mediante acompañamiento técnico, formación práctica y nuevas herramientas digitales.</p>
            <div className="button-row"><a className="button primary" href="#contacto">Hablemos de tu necesidad <span>→</span></a><a className="button secondary" href="#servicios">Conoce mis servicios</a></div>
            <div className="hero-facts"><div><strong>11+</strong><span>años de experiencia</span></div><div><strong>12+</strong><span>empresas y proyectos</span></div><div><strong>SST + IA</strong><span>visión integral</span></div></div>
          </div>
          <div className="portrait-wrap" aria-label="Espacio para fotografía profesional de Julio César Porras">
            <div className="portrait-placeholder"><span>JCP</span><p>Fotografía profesional<br /><small>Imagen temporal · reemplazar aquí</small></p></div>
            <div className="portrait-note"><strong>Julio César Porras</strong><span>Profesional SST · Entrenador de alturas</span></div>
          </div>
        </section>

        <section className="profile section" id="perfil">
          <div className="section-label">01 — Perfil profesional</div>
          <div className="profile-grid"><h2>Experiencia en campo.<br /><em>Visión de futuro.</em></h2><div><p className="large-copy">Profesional en Seguridad y Salud en el Trabajo con 11 años de experiencia en prevención de riesgos laborales.</p><p>He trabajado en construcción de infraestructura vial, minería en etapas de exploración y prospección, servicios y copropiedades del Área Metropolitana del Valle de Aburrá.</p><p>Mi recorrido va desde la asistencia hasta el liderazgo de procesos de SST. Desde 2026 también soy entrenador de trabajo en alturas y desarrollo soluciones digitales iniciales apoyadas en inteligencia artificial.</p></div></div>
        </section>

        <section className="services section" id="servicios">
          <div className="section-heading"><div><div className="section-label light">02 — Servicios</div><h2>Soluciones para una gestión<br /><em>más segura y consciente.</em></h2></div><p>Acompañamiento adaptado a las necesidades reales de cada organización.</p></div>
          <div className="service-grid">{services.map(([n, title, text]) => <article className="service-card" key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p><a href="#contacto" aria-label={`Consultar por ${title}`}>Consultar <b>↗</b></a></article>)}</div>
        </section>

        <section className="credentials section" id="formacion">
          <div><div className="section-label">03 — Formación y credenciales</div><h2>Aprendizaje constante,<br /><em>criterio profesional.</em></h2><p>Una trayectoria que integra conocimiento técnico, experiencia aplicada y nuevas capacidades digitales.</p></div>
          <div className="credential-list">{credentials.map(([year, title]) => <div key={title}><span>{year}</span><strong>{title}</strong><i>✓</i></div>)}</div>
        </section>

        <section className="experience section" id="experiencia">
          <div className="section-label">04 — Experiencia destacada</div><div className="experience-grid"><div><h2>Del terreno a la<br /><em>mejora continua.</em></h2><blockquote>“La prevención funciona cuando las personas entienden el riesgo y pueden actuar sobre él.”</blockquote></div><ul><li><span>01</span>Liderazgo del proceso de SST en proyectos de infraestructura vial con LATINCO S.A.</li><li><span>02</span>Capacitaciones de promoción y prevención para ARL en alturas, riesgo biológico, COPASST y vigías SST.</li><li><span>03</span>Experiencia acumulada con más de 12 empresas y proyectos de distintos sectores.</li><li><span>04</span>Informes técnicos de inspección apoyados en IA para facilitar la comprensión de las acciones de mejora.</li></ul></div>
        </section>

        <section className="projects section" id="proyectos">
          <div className="section-heading"><div><div className="section-label">05 — Proyectos tecnológicos</div><h2>Tecnología al servicio<br /><em>de la prevención.</em></h2></div><p>Exploraciones digitales con un objetivo práctico: hacer más accesible la información y apoyar mejores decisiones.</p></div>
          <div className="project-grid"><article><span className="project-tag">Asistente virtual</span><h3>ARPREN<br />Assistant</h3><p>Facilita el acceso a información sobre los servicios de ARPREN S.A.S. mediante una base de conocimiento y reconoce con transparencia cuando no dispone de una respuesta.</p><div className="project-number">01</div></article><article><span className="project-tag">En desarrollo</span><h3>Ergo<span>IA</span></h3><p>Aplicación web interactiva y multimodal que utilizará inteligencia artificial para apoyar la prevención del riesgo biomecánico mediante imágenes y recomendaciones personalizadas.</p><div className="project-number">02</div></article></div>
        </section>

        <section className="contact section" id="contacto">
          <div className="contact-info"><div className="section-label light">06 — Contacto</div><h2>Hablemos de<br /><em>tu necesidad.</em></h2><p>Cuéntame qué necesitas fortalecer. Revisaré tu caso y me pondré en contacto contigo.</p><div className="contact-lines"><a href="mailto:Mr.JulliosSST@gmail.com"><span>Correo</span>Mr.JulliosSST@gmail.com</a><a href="https://wa.me/573152569806" target="_blank" rel="noreferrer"><span>Teléfono y WhatsApp</span>+57 315 256 9806</a><p><span>Ubicación</span>Área Metropolitana del Valle de Aburrá<br />Antioquia, Colombia</p></div></div>
          <form onSubmit={handleSubmit} noValidate={false}>
            <div className="field-row"><label>Nombre completo *<input name="name" type="text" minLength={2} required placeholder="Tu nombre" autoComplete="name" /></label><label>Empresa u organización<input name="company" type="text" placeholder="Opcional" autoComplete="organization" /></label></div>
            <div className="field-row"><label>Correo electrónico *<input name="email" type="email" required placeholder="tu@correo.com" autoComplete="email" /></label><label>Teléfono o WhatsApp<input name="phone" type="tel" placeholder="Opcional" autoComplete="tel" /></label></div>
            <label>Servicio de interés *<select name="service" required defaultValue=""><option value="" disabled>Selecciona una opción</option>{serviceOptions.map(option => <option key={option}>{option}</option>)}</select></label>
            <label>Mensaje *<textarea name="message" required minLength={10} maxLength={2000} rows={5} placeholder="Cuéntame brevemente sobre tu necesidad..." /></label>
            <label className="consent"><input name="data_consent" type="checkbox" required /><span>Autorizo el tratamiento de mis datos personales para gestionar esta solicitud de contacto. *</span></label>
            <button className="submit-button" disabled={sending} type="submit">{sending ? 'Enviando solicitud...' : 'Hablemos de tu necesidad'} <span>→</span></button>
            {status.message && <div className={`form-message ${status.type}`} role="status" aria-live="polite">{status.message}</div>}
          </form>
        </section>
      </main>

      <footer><a className="brand footer-brand" href="#inicio"><span>JCP</span><div>Julio César Porras<small>Seguridad · Formación · Tecnología</small></div></a><p>© {new Date().getFullYear()} Julio César Porras. Todos los derechos reservados.</p><a href="#inicio">Volver arriba ↑</a></footer>
    </>
  )
}

export default App
