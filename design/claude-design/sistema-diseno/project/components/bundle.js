/* @ds-bundle: {"format":4,"namespace":"LinkEdu","components":[{"name":"Button"},{"name":"Tag"},{"name":"Avatar"},{"name":"Input"},{"name":"ProfileCard"},{"name":"ResourceCard"}]} */
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

  window.LinkEdu = Object.assign(window.LinkEdu || {}, {
    Button: Button,
    Tag: Tag,
    Avatar: Avatar,
    Input: Input,
    ProfileCard: ProfileCard,
    ResourceCard: ResourceCard
  });
})();
