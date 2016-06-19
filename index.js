var hasOwn = Object.prototype.hasOwnProperty;

var reAmpersand = /&/g;
var reLessThan = /</g;
var reGreaterThan = />/g;
var reQuote = /"/g;

function escape(value) {
	if (value == null) {
		return '';
	}
	return value.toString()
		.replace(reAmpersand, '&amp;')
		.replace(reLessThan, '&lt;')
		.replace(reGreaterThan, '&gt;')
		.replace(reQuote, '&quot;');
}

function each(target, cb, context) {
	if (target) {
		if (Array.isArray(target)) {
			for (var i = 0, l = target.length; i < l; i++) {
				cb.call(context, target[i], i);
			}
		} else if (typeof target.forEach == 'function') {
			target.forEach(cb, context);
		} else {
			for (var name in target) {
				if (hasOwn.call(target, name)) {
					cb.call(context, target[name], name);
				}
			}
		}
	}
}

var defaults = exports.defaults = {
	escape: escape,
	include: null,
	helpers: {},
	each: each
};

function prepareTemplate(tmpl, opts) {
	if (!opts) {
		opts = {};
	}

	var escape = opts.escape || defaults.escape;
	var include = opts.include || defaults.include;
	var helpers = opts.helpers || defaults.helpers;
	var each = opts.each || defaults.each;

	function t(it, opts) {
		if (!opts) {
			opts = {};
		}

		return tmpl(
			it,
			opts.escape || escape,
			opts.include || include,
			opts.helpers || helpers,
			opts.each || each
		);
	}
	t.render = t;

	return t;
}

exports.prepareTemplate = prepareTemplate;
