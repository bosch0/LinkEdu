/* @ds-bundle: {"format":4,"namespace":"LinkEdu","components":[{"name":"Icon"},{"name":"Button"},{"name":"Tag"},{"name":"Avatar"},{"name":"Input"},{"name":"ProfileCard"},{"name":"ResourceCard"},{"name":"ProjectCard"},{"name":"JobCard"},{"name":"PostCard"},{"name":"EmptyState"}]} */
(function () {
  var h = window.React.createElement;
  var fmt = new Intl.NumberFormat('es-ES', { useGrouping: 'always' });
  var AVATAR_TONES = ['marino', 'azul', 'neutral'];

  function cx() {
    return Array.prototype.filter.call(arguments, Boolean).join(' ');
  }

  function omit(obj, keys) {
    var out = {};
    for (var k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) === -1) out[k] = obj[k];
    }
    return out;
  }

  function initials(name) {
    return String(name || '').trim().split(/\s+/).slice(0, 2)
      .map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
  }

  // El mismo nombre siempre tiene el mismo color.
  function toneFor(name) {
    var n = 0;
    for (var i = 0; i < name.length; i++) n = (n * 31 + name.charCodeAt(i)) >>> 0;
    return AVATAR_TONES[n % AVATAR_TONES.length];
  }

  function Button(props) {
    var variant = props.variant || 'secondary';
    var rest = omit(props, ['variant', 'size', 'className', 'children']);
    return h('button', Object.assign({ type: 'button' }, rest, {
      className: cx('le-btn', 'le-btn--' + variant, props.size === 's' && 'le-btn--s', props.className)
    }), props.children);
  }

  function Tag(props) {
    return h('span', { className: cx('le-tag', 'le-tag--' + (props.tone || 'neutral'), props.className) }, props.children);
  }

  function Avatar(props) {
    var name = props.name || '';
    return h('span', {
      className: cx('le-avatar', 'le-avatar--' + (props.size || 'm'), 'le-avatar--' + toneFor(name),
        props.available && 'le-avatar--available', props.className),
      role: 'img',
      'aria-label': props.available ? name + ' (disponible)' : name
    }, props.src ? h('img', { src: props.src, alt: '' }) : h('span', { 'aria-hidden': 'true' }, initials(name)));
  }

  function Input(props) {
    var msg = props.error || props.hint;
    var msgId = props.id + '-msg';
    var rest = omit(props, ['label', 'hint', 'error', 'className']);
    return h('div', { className: cx('le-field', props.error && 'le-field--error', props.className) },
      h('label', { htmlFor: props.id, className: 'le-field__label' }, props.label),
      h('input', Object.assign({ className: 'le-field__input' }, rest, {
        'aria-invalid': props.error ? 'true' : undefined,
        'aria-describedby': msg ? msgId : undefined
      })),
      msg ? h('p', { id: msgId, className: 'le-field__msg' }, msg) : null);
  }

  function ProfileCard(props) {
    var tags = props.tags || [];
    return h('article', { className: cx('le-card', 'le-profile', props.className) },
      h('header', { className: 'le-profile__head' },
        h(Avatar, { name: props.name, src: props.avatar, size: 'l', available: props.available }),
        h('div', { className: 'le-profile__id' },
          h('h3', { className: 'le-profile__name' }, props.name),
          h('p', { className: 'le-profile__role' }, props.role),
          props.place ? h('p', { className: 'le-profile__place' }, props.place) : null)),
      tags.length || props.available ? h('div', { className: 'le-tags' },
        props.available ? h(Tag, { tone: 'turquesa' }, 'Disponible') : null,
        tags.map(function (t) { return h(Tag, { key: t, tone: 'marino' }, t); })) : null,
      h('footer', { className: 'le-profile__actions' },
        h(Button, {
          variant: props.connected ? 'secondary' : 'primary',
          'aria-pressed': props.connected ? 'true' : 'false',
          onClick: props.onConnect
        }, props.connected ? 'Conectado' : 'Conectar'),
        h(Button, { variant: 'quiet', onClick: props.onOpen }, 'Ver perfil')));
  }

  function ResourceCard(props) {
    var tags = props.tags || [];
    return h('article', { className: cx('le-card', 'le-resource', props.className) },
      h('p', { className: 'le-resource__kind' }, props.detail ? props.kind + ' · ' + props.detail : props.kind),
      h('h3', { className: 'le-resource__title' }, props.title),
      h('div', { className: 'le-resource__author' },
        h(Avatar, { name: props.author, size: 's' }),
        h('span', null, props.author)),
      tags.length ? h('div', { className: 'le-tags' },
        tags.map(function (t, i) { return h(Tag, { key: t, tone: i === 0 ? 'marino' : 'azul' }, t); })) : null,
      h('footer', { className: 'le-resource__foot' },
        h('p', { className: 'le-resource__stats' },
          fmt.format(props.downloads || 0) + ' descargas · ' + fmt.format(props.saves || 0) + ' guardados'),
        h(Button, {
          variant: 'quiet',
          size: 's',
          'aria-pressed': props.saved ? 'true' : 'false',
          onClick: props.onSave
        }, props.saved ? 'Guardado' : 'Guardar')));
  }

  // Generado desde design/assets/iconos/ con iconos.py. No editar a mano.
  // @iconos-inicio
  var ICONS = {
      "inicio": "<path d=\"M3 11 12 4l9 7\"/><path d=\"M5 10v10h14V10\"/><path d=\"M10 20v-5h4v5\"/>",
      "buscar": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m16.5 16.5 4.5 4.5\"/>",
      "red": "<circle cx=\"9\" cy=\"8\" r=\"3.5\"/><path d=\"M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6\"/><circle cx=\"17\" cy=\"9\" r=\"2.5\"/><path d=\"M16.5 14.1c2.6.3 4.5 2.6 4.5 5.4\"/>",
      "conectar": "<circle cx=\"10\" cy=\"8\" r=\"3.5\"/><path d=\"M4 20c0-3.3 2.7-6 6-6s6 2.7 6 6\"/><path d=\"M19 7v6M16 10h6\"/>",
      "perfil": "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8\"/>",
      "mensajes": "<path d=\"M4 5h16v11H9l-5 4z\"/>",
      "notificaciones": "<path d=\"M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z\"/><path d=\"M10 21h4\"/>",
      "proyecto": "<rect x=\"4\" y=\"4\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"13\" y=\"4\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"4\" y=\"13\" width=\"7\" height=\"7\" rx=\"1.5\"/><circle cx=\"16.5\" cy=\"16.5\" r=\"3.5\"/>",
      "recurso": "<path d=\"M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z\"/><path d=\"M5 17a3 3 0 0 1 3-3h11\"/>",
      "empleo": "<rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2\"/><path d=\"M3 13h18\"/>",
      "formacion": "<path d=\"m2 9 10-5 10 5-10 5z\"/><path d=\"M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5\"/><path d=\"M22 9v6\"/>",
      "guardar": "<path d=\"M6 3h12v18l-6-4-6 4z\"/>",
      "compartir": "<circle cx=\"18\" cy=\"5\" r=\"2.5\"/><circle cx=\"6\" cy=\"12\" r=\"2.5\"/><circle cx=\"18\" cy=\"19\" r=\"2.5\"/><path d=\"m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6\"/>",
      "megusta": "<path d=\"M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z\"/>",
      "comentar": "<path d=\"M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z\"/>",
      "calendario": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M3 10h18M8 3v4M16 3v4\"/>",
      "ubicacion": "<path d=\"M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/>",
      "descargar": "<path d=\"M12 4v11M7 10l5 5 5-5M5 20h14\"/>",
      "subir": "<path d=\"M12 15V4M7 9l5-5 5 5M5 20h14\"/>",
      "filtro": "<path d=\"M4 5h16l-6 8v6l-4-2v-4z\"/>",
      "ajustes": "<path d=\"M4 7h10M18 7h2M4 17h4M12 17h8\"/><circle cx=\"16\" cy=\"7\" r=\"2\"/><circle cx=\"10\" cy=\"17\" r=\"2\"/>",
      "mas": "<path d=\"M12 5v14M5 12h14\"/>",
      "cerrar": "<path d=\"M6 6l12 12M18 6 6 18\"/>",
      "check": "<path d=\"m5 12.5 4.5 4.5L19 7\"/>",
      "flecha": "<path d=\"M5 12h14M13 6l6 6-6 6\"/>",
      "menu": "<path d=\"M4 6h16M4 12h16M4 18h16\"/>"
  };
  // @iconos-fin

  function Icon(props) {
    var size = props.size || 20;
    return h('svg', {
      className: cx('le-icon', props.className),
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      role: props.label ? 'img' : undefined,
      'aria-label': props.label,
      'aria-hidden': props.label ? undefined : 'true',
      dangerouslySetInnerHTML: { __html: ICONS[props.name] || '' }
    });
  }

  function subjectTags(tags) {
    return tags.length ? h('div', { className: 'le-tags' },
      tags.map(function (t, i) { return h(Tag, { key: t, tone: i === 0 ? 'marino' : 'azul' }, t); })) : null;
  }

  function ProjectCard(props) {
    var centres = props.centres || [];
    var total = props.slots || centres.length;
    var pct = total ? Math.min(100, Math.round(centres.length / total * 100)) : 0;
    return h('article', { className: cx('le-card', 'le-project', props.className) },
      h('p', { className: 'le-kicker' }, h(Icon, { name: 'proyecto', size: 16 }), 'Proyecto colaborativo'),
      h('h3', { className: 'le-card__title' }, props.title),
      props.summary ? h('p', { className: 'le-card__text' }, props.summary) : null,
      subjectTags(props.tags || []),
      h('div', { className: 'le-project__team' },
        h('div', { className: 'le-stack' },
          centres.slice(0, 4).map(function (c) { return h(Avatar, { key: c, name: c, size: 's' }); })),
        h('p', { className: 'le-project__slots' }, centres.length + ' de ' + total + ' centros')),
      h('div', {
        className: 'le-meter',
        role: 'progressbar',
        'aria-label': 'Centros inscritos',
        'aria-valuemin': 0,
        'aria-valuemax': total,
        'aria-valuenow': centres.length
      }, h('span', { style: { width: pct + '%' } })),
      h('footer', { className: 'le-card__foot' },
        props.deadline ? h('p', { className: 'le-meta' }, h(Icon, { name: 'calendario', size: 16 }), 'Hasta el ' + props.deadline) : h('span'),
        h(Button, {
          variant: props.joined ? 'secondary' : 'primary',
          size: 's',
          'aria-pressed': props.joined ? 'true' : 'false',
          onClick: props.onJoin
        }, props.joined ? 'Inscrito' : 'Unirme')));
  }

  function JobCard(props) {
    var facts = [
      props.place && ['ubicacion', props.place],
      props.hours && ['calendario', props.hours],
      props.pay && ['empleo', props.pay]
    ].filter(Boolean);
    return h('article', { className: cx('le-card', 'le-job', props.className) },
      h('header', { className: 'le-profile__head' },
        h(Avatar, { name: props.company, src: props.logo, size: 'm' }),
        h('div', { className: 'le-profile__id' },
          h('h3', { className: 'le-card__title' }, props.title),
          h('p', { className: 'le-profile__place' }, props.company))),
      h('div', { className: 'le-tags' },
        props.isNew ? h(Tag, { tone: 'naranja' }, 'Nuevo') : null,
        props.modality ? h(Tag, { tone: 'neutral' }, props.modality) : null,
        (props.tags || []).map(function (t) { return h(Tag, { key: t, tone: 'marino' }, t); })),
      facts.length ? h('ul', { className: 'le-facts' }, facts.map(function (f) {
        return h('li', { key: f[0] }, h(Icon, { name: f[0], size: 16 }), f[1]);
      })) : null,
      h('footer', { className: 'le-card__foot' },
        h('p', { className: 'le-meta' }, props.posted || ''),
        h(Button, {
          variant: props.applied ? 'secondary' : 'primary',
          size: 's',
          'aria-pressed': props.applied ? 'true' : 'false',
          onClick: props.onApply
        }, props.applied ? 'Inscrito' : 'Inscribirme')));
  }

  function PostCard(props) {
    var likes = (props.likes || 0) + (props.liked ? 1 : 0);
    return h('article', { className: cx('le-card', 'le-post', props.className) },
      h('header', { className: 'le-profile__head' },
        h(Avatar, { name: props.author, src: props.avatar, size: 'm' }),
        h('div', { className: 'le-profile__id' },
          h('p', { className: 'le-post__author' }, props.author),
          h('p', { className: 'le-meta' }, props.role ? props.role + ' · ' + props.time : props.time))),
      h('p', { className: 'le-post__text' }, props.text),
      props.resource ? h('div', { className: 'le-post__attach' },
        h('span', { className: 'le-post__attach-icon' }, h(Icon, { name: 'recurso' })),
        h('div', { className: 'le-profile__id' },
          h('p', { className: 'le-resource__kind' }, props.resource.kind),
          h('p', { className: 'le-post__attach-title' }, props.resource.title))) : null,
      h('footer', { className: 'le-post__actions' },
        h(Button, { variant: 'quiet', size: 's', 'aria-pressed': props.liked ? 'true' : 'false', onClick: props.onLike },
          h(Icon, { name: 'megusta', size: 18, className: props.liked ? 'le-icon--filled' : undefined }), 'Me gusta · ' + fmt.format(likes)),
        h(Button, { variant: 'quiet', size: 's', onClick: props.onComment },
          h(Icon, { name: 'comentar', size: 18 }), 'Comentar · ' + fmt.format(props.comments || 0)),
        h(Button, { variant: 'quiet', size: 's', onClick: props.onShare },
          h(Icon, { name: 'compartir', size: 18 }), 'Compartir')));
  }

  // Ilustración del sistema: formas planas del logo sobre la cuadrícula.
  function EmptyArt() {
    return h('svg', { className: 'le-empty__art', viewBox: '0 0 240 140', 'aria-hidden': 'true' },
      h('rect', { className: 'le-ill-soft', x: 0, y: 12, width: 240, height: 116, rx: 20 }),
      h('rect', { className: 'le-ill-marino', x: 40, y: 32, width: 112, height: 76, rx: 12 }),
      h('rect', { className: 'le-ill-paper', x: 52, y: 46, width: 56, height: 6, rx: 3 }),
      h('rect', { className: 'le-ill-paper', x: 52, y: 60, width: 80, height: 6, rx: 3 }),
      h('rect', { className: 'le-ill-paper', x: 52, y: 74, width: 40, height: 6, rx: 3 }),
      h('circle', { className: 'le-ill-naranja', cx: 176, cy: 44, r: 20 }),
      h('rect', { className: 'le-ill-turquesa', x: 140, y: 88, width: 72, height: 28, rx: 14 }),
      h('rect', { className: 'le-ill-amarillo', x: 24, y: 100, width: 32, height: 16, rx: 8 }),
      h('rect', { className: 'le-ill-azul', x: 196, y: 72, width: 12, height: 12, rx: 3 }));
  }

  function EmptyState(props) {
    return h('section', { className: cx('le-empty', props.className) },
      h(EmptyArt),
      h('h3', { className: 'le-empty__title' }, props.title),
      props.text ? h('p', { className: 'le-empty__text' }, props.text) : null,
      props.action ? h(Button, { variant: 'primary', onClick: props.onAction }, props.action) : null);
  }

  window.LinkEdu = Object.assign(window.LinkEdu || {}, {
    Icon: Icon,
    ProjectCard: ProjectCard,
    JobCard: JobCard,
    PostCard: PostCard,
    EmptyState: EmptyState,
    Button: Button,
    Tag: Tag,
    Avatar: Avatar,
    Input: Input,
    ProfileCard: ProfileCard,
    ResourceCard: ResourceCard
  });
})();
