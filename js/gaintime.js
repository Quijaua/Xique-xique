/*GainTime v3.0.0 - CourageousWarrior*/
function makeA(e) {
    e.addEventListener("click", function (t) {
      var n = e.href.split("/"),
        a = n[n.length - 1].split("#"),
        o = document.location.toString().split("/"),
        r = o[o.length - 1].split("#");
      if (((f = a[1]), void 0 != f && r[0] === a[0])) {
        t.preventDefault();
        var l = document.scrollingElement || document.documentElement,
          s = document.getElementById(f).offsetTop - 60;
        smoothScroll(l, s, 600);
      }
    });
  }
  
  function menuToggle(e) {
    var t = e.nextElementSibling;
    e.addEventListener("click", function (e) {
      e.stopPropagation(),
        t.style.maxWidth
          ? t.style.removeProperty("max-width")
          : (t.style.maxWidth = "400px");
    });
  }
  
  function closeMenus() {
    menuToggles.forEach(function (e) {
      e.nextElementSibling.style.removeProperty("max-width");
    });
  }
  
  function makeDropdown(e) {
    e.setAttribute("role", "button"),
      e.setAttribute("tabindex", "0"),
      e.addEventListener("click", function (t) {
        t.stopPropagation(), toogleDropdown(e);
      }),
      [].slice
        .call(e.getElementsByTagName("ul")[0].getElementsByTagName("li"))
        .forEach(function (e) {
          e.setAttribute("tabindex", "-1");
        }),
      e.addEventListener("keypress", function (t) {
        13 === t.keyCode && toogleDropdown(e),
          27 === t.keyCode && closeDropdowns();
      }),
      e.addEventListener("keydown", function (t) {
        (38 === t.keyCode || 40 === t.keyCode) &&
          (t.preventDefault(), dropdownsNavKeys(e, t.keyCode));
      });
  }
  
  function dropdownsNavKeys(e, t) {
    var n = [].slice.call(
        e.getElementsByTagName("ul")[0].getElementsByTagName("li")
      ),
      a = n.indexOf(document.activeElement);
    -1 == a && (a = n.indexOf(document.activeElement.parentElement)),
      40 == t ? a++ : a--,
      a >= 0 &&
        a < n.length &&
        ("A" == n[a].firstChild.nodeName
          ? n[a].firstChild.focus()
          : n[a].focus());
  }
  
  function toogleDropdown(e) {
    var t = e.getElementsByTagName("ul")[0],
      n = !!t.style.display;
    closeDropdowns(),
      n ? t.style.removeProperty("display") : (t.style.display = "list-item"),
      e.focus();
  }
  
  function closeDropdowns() {
    dropdowns.forEach(function (e) {
      e.getElementsByTagName("ul")[0].style.removeProperty("display");
    });
  }
  
  // Barra de progresso -- sugestão de barbgluz para melhorar acessibilidade
  function bar(e) {
    e.setAttribute("role", "progressbar"),e.setAttribute("aria-valuenow", e.dataset.percentage),e.setAttribute("aria-valuemin", "0"),e.setAttribute("aria-valuemax", "100")
    var t = document.createElement("div");
    t.setAttribute("class", "percentage " + e.dataset.color), t.setAttribute("style", "width: " + e.dataset.percentage + '%' );
    var o = document.createTextNode(e.dataset.text);
    if ("undefined" != o.data) {
      var n = document.createElement("span");
      n.appendChild(o), n.style.padding = "0 10px", t.appendChild(n), e.style.height = "20px"
    }
    e.appendChild(t)
  }
  
  function tooltip(e) {
    e.style.position = "relative";
    var t = document.createTextNode(e.dataset.tooltip),
      n = document.createElement("div");
    n.appendChild(t), n.setAttribute("class", "tooltip"), e.appendChild(n);
  }
  
  function close(e) {
    e.addEventListener("click", function (t) {
      t.stopPropagation(), remove(e.parentElement);
    });
  }
  
  function fadeOut(e) {
    var t = setInterval(function () {
      (e.style.opacity = "0"),
        (e.style.padding = "0"),
        (e.style.maxHeight = "0px"),
        clearInterval(t);
    }, 1);
  }
  
  function remove(e) {
    e.parentElement.removeChild(e);
  }
  
  function ask(e) {
    e.addEventListener("click", function (t) {
      return confirm(e.dataset.ask) ? void 0 : (t.preventDefault(), !1);
    });
  }
  
  function preformat(e, t) {
    var n = t ? e.textContent : e.value,
      a = n,
      o = t || e.dataset.validate;
    if (n) {
      switch (o) {
        case "cpf":
          a = preformatCpf(n);
          break;
        case "cnpj":
          a = preformatCnpj(n);
          break;
        case "brPhone":
          a = preformatPhone(n);
          break;
        case "cep":
          a = preformatCep(n);
          break;
        case "date":
          a = preformatDate(n);
      }
      t && (e.innerHTML = a), (e.value = a);
    } else t ? (e.textContent = "") : (e.value = "");
  }
  
  function formater(e) {
    preformat(e),
      e.addEventListener("keyup", function (t) {
        switch (e.dataset.validate) {
          case "date":
            isPaste(e, t) ? preformat(e) : formatDate(e, t);
            break;
          default:
            isPaste(e, t) && preformat(e);
        }
      }),
      e.addEventListener("keydown", function (t) {
        switch (e.dataset.validate) {
          case "cpf":
            formatCpf(e, t);
            break;
          case "cnpj":
            formatCnpj(e, t);
            break;
          case "brPhone":
            formatBrPhone(e, t);
            break;
          case "cep":
            formatCep(e, t);
            break;
          case "date":
          case "num":
            onlyNumbers(t);
            break;
          case "text":
            blockNum(t);
        }
      });
  }
  
  function isPaste(e, t) {
    return t.ctrlKey && 86 == t.keyCode;
  }
  
  function onlyNumbers(e) {
    if (
      (isNaN(e.key) &&
        ctrlButtons(e) &&
        !e.ctrlKey &&
        "Tab" != e.key &&
        "ArrowLeft" != e.key &&
        "ArrowRight" != e.key &&
        "ArrowDown" != e.key &&
        "ArrowUp" != e.key &&
        "Enter" != e.key) ||
      " " == e.key
    )
      return e.preventDefault(), !1;
  }
  
  function blockNum(e) {
    if (
      !isNaN(e.key) &&
      0 != e.keyCode &&
      8 != e.keyCode &&
      46 != e.keyCode &&
      !e.ctrlKey &&
      "Tab" != e.key &&
      "ArrowLeft" != e.key &&
      "ArrowRight" != e.key &&
      "ArrowDown" != e.key &&
      "ArrowUp" != e.key &&
      "Enter" != e.key &&
      " " != e.key
    )
      return e.preventDefault(), !1;
  }
  
  function ctrlButtons(e) {
    return 0 != e.keyCode && 8 != e.keyCode && 46 != e.keyCode;
  }
  
  function preformatPhone(e) {
    var t = ("" + e).replace(/\D/g, "");
    t.length <= 10
      ? (m = t.match(/^(\d{1,2})?[- ]?(\d{1,4})?(\d{1,4})?(.*)?$/))
      : (m = t.match(/^(\d{1,2})?[- ]?(\d{1,5})?(\d{1,4})?(.*)?$/));
    for (var n = 1; n <= 3; n++) m[n] || (m[n] = "");
    return m ? "(" + m[1] + ") " + m[2] + "-" + m[3] : null;
  }
  
  function preformatCpf(e) {
    (s2 = ("" + e).replace(/\D/g, "")),
      (m = s2.match(/^(\d{1,3})?[- ]??[\s]?(\d{1,3})?[\s]?(\d{1,3})?(.*)?$/));
    for (var t = 1; t <= 4; t++) m[t] || (m[t] = "");
    return m ? m[1] + "." + m[2] + "." + m[3] + "-" + m[4] : null;
  }
  
  function preformatCnpj(e) {
    (s2 = ("" + e).replace(/\D/g, "")),
      (m = s2.match(
        /^(\d{1,2})?[- ]??[\s]?(\d{1,3})?[\s]?(\d{1,3})?(\d{1,4})?(\d{1,2})?(.*)?$/
      ));
    for (var t = 1; t <= 5; t++) m[t] || (m[t] = "");
    return m ? m[1] + "." + m[2] + "." + m[3] + "/" + m[4] + "-" + m[5] : null;
  }
  
  function preformatCep(e) {
    (s2 = ("" + e).replace(/\D/g, "")),
      (m = s2.match(/^(\d{1,5})?[- ]??[\s]?(\d{1,3})?(.*)?$/));
    for (var t = 1; t <= 2; t++) m[t] || (m[t] = "");
    return m ? m[1] + "-" + m[2] : null;
  }
  
  function preformatDate(e) {
    (s2 = ("" + e).replace(/\D/g, "")),
      (m = s2.match(/^(\d{1,2})?[- ]??[\s]?(\d{1,2})?(.*)?$/));
    for (var t = 1; t <= 3; t++) m[t] || (m[t] = "");
    return m ? m[1] + "/" + m[2] + "/" + m[3] : null;
  }
  
    function formatCpf(e, t) {
        onlyNumbers(t),
      ctrlButtons(t) &&
        ((3 != e.value.length && 7 != e.value.length) ||
          (e.value = e.value + "."),
        11 == e.value.length && (e.value = e.value + "-"));

        if (e.value.length > 13) {
            e.value = e.value.slice(0, 13);
            return;
        }
    }
  
  function formatCnpj(e, t) {
    onlyNumbers(t),
      ctrlButtons(t) &&
        ((2 != e.value.length && 6 != e.value.length) ||
          (e.value = e.value + "."),
        10 == e.value.length && (e.value = e.value + "/"),
        15 == e.value.length && (e.value = e.value + "-"));
        if (e.value.length > 17) {
            e.value = e.value.slice(0, 17);
            return;
        }


  }
  

  function formatBrPhone(e, t) {
    onlyNumbers(t),
      ctrlButtons(t) &&
        ((0 != e.value.length && e.selectionStart > 1) ||
          "Tab" == t.key ||
          "Enter" == t.key ||
          t.ctrlKey ||
          (e.value = "("),
        "9" == e.value[5] && 10 == e.value.length && (e.value = e.value + "-"),
        "9" != e.value[5] && 9 == e.value.length && (e.value = e.value + "-"),
        3 != e.value.length || (e.value = e.value + ") "));
        if (e.value.length > 14) {
            e.value = e.value.slice(0, 14);
            return;
        }
  }
  

  function formatCep(e, t) {
    onlyNumbers(t),
      ctrlButtons(t) && (5 != e.value.length || (e.value = e.value + "-"));
        if (e.value.length > 9) {
            e.value = e.value.slice(0, 9);
            return;
        }
  }
  

  function formatDate(e, t) {
    onlyNumbers(t),
      ctrlButtons(t) &&
        ((2 != e.value.length && 5 != e.value.length) ||
          (e.value = e.value + "/"));
        if (e.value.length > 10) {
            e.value = e.value.slice(0, 10);
            return;
        }
  }
  

  function validates(e) {
    e.addEventListener("blur", function (t) {
      formater(e), switchValidations(e);
    });
  }
  
  function switchValidations(e) {
    switch (e.dataset.validate) {
      case "text":
        searcher(
          e,
          /^[a-zA-ZÃẼĨÕŨãẽĩõũÁÉÍÓÚáéíóúÂÊÎÔÛâêîôûÀÈÌÒÙàèìòùÄËÏÖÜäëïöü' ]*$/
        );
        break;
      case "num":
        searcher(e, /^[\d]*$/g);
        break;
      case "cpf":
        validateCpf(e.value) || "" == e.value
          ? validsIt(e)
          : invalidsIt(e, "Este CPF é inválido.");
        break;
      case "cnpj":
        validateCnpj(e.value) || "" == e.value
          ? validsIt(e)
          : invalidsIt(e, "Este CNPJ é inválido.");
        break;
      case "brPhone":
        validateBrPhone(e.value) || "" == e.value
          ? validsIt(e)
          : invalidsIt(e, "Este Telefone é inválido.");
        break;
      case "date":
        validateDate(e.value) || "" == e.value
          ? validsIt(e)
          : invalidsIt(e, "Esta data é inválida.");
        break;
      case "cep":
        break;
      default:
        searcher(e, new RegExp(e.dataset.validate));
    }
  }
  
  function invalidsIt(e, t) {
    (e.style.border = "1px solid #F00"),
      t ? e.setCustomValidity(t) : e.setCustomValidity("Invalid field.");
  }
  
  function validsIt(e) {
    e.style.removeProperty("border"), e.setCustomValidity("");
  }
  
  function searcher(e, t) {
    null == e.value.match(t) ? invalidsIt(e, !1) : validsIt(e);
  }
  
  function validateBrPhone(e) {
    var t = e.replace(/\D/g, "");
    if (
      !(t.length >= 10 && t.length <= 11) ||
      (11 == t.length && 9 != parseInt(t.substring(2, 3)))
    )
      return !1;
    return !(
      -1 ==
      [
        11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
      ].indexOf(parseInt(t.substring(0, 2)))
    );
  }
  
  function validateDate(e) {
    var t = e.replace(/\D/g, ""),
      n = parseInt(t.substring(0, 2)),
      a = parseInt(t.substring(2, 4)),
      o = parseInt(t.substring(4));
    if (n > 30 && (4 == a || 6 == a || 9 == a || 11 == a)) return !1;
    if (2 == a)
      if (o % 4 != 0 || (o % 100 == 0 && o % 400 != 0)) {
        if (n > 28) return !1;
      } else if (n > 29) return !1;
    return !(t.length < 5 || a > 12 || n > 31 || n < 1) && 1;
  }
  
  function validateCpf(e) {
    var t,
      n,
      a = e.replace(/\./g, "");
    if (((t = 0), "00000000000" == (a = a.replace(/\-/g, "")))) return !1;
    for (i = 1; i <= 9; i++) t += parseInt(a.substring(i - 1, i)) * (11 - i);
    if (
      ((10 != (n = (10 * t) % 11) && 11 != n) || (n = 0),
      n != parseInt(a.substring(9, 10)))
    )
      return !1;
    for (t = 0, i = 1; i <= 10; i++)
      t += parseInt(a.substring(i - 1, i)) * (12 - i);
    return (
      (10 != (n = (10 * t) % 11) && 11 != n) || (n = 0),
      n == parseInt(a.substring(10, 11))
    );
  }
  
  function validateCnpj(e) {
    if ("" == (e = e.replace(/[^\d]+/g, ""))) return !1;
    if (14 != e.length) return !1;
    if (
      "00000000000000" == e ||
      "11111111111111" == e ||
      "22222222222222" == e ||
      "33333333333333" == e ||
      "44444444444444" == e ||
      "55555555555555" == e ||
      "66666666666666" == e ||
      "77777777777777" == e ||
      "88888888888888" == e ||
      "99999999999999" == e
    )
      return !1;
    for (
      n = e.substring(0, 12), d = e.substring(12), t = 12, s = 0, p = 5, i = t;
      i >= 1;
      i--
    )
      (s += n.charAt(t - i) * p--), p < 2 && (p = 9);
    if (((r = s % 11 < 2 ? 0 : 11 - (s % 11)), r != d.charAt(0))) return !1;
    for (n = e.substring(0, 13), t = 13, s = 0, p = 6, i = t; i >= 1; i--)
      (s += n.charAt(t - i) * p--), p < 2 && (p = 9);
    return (r = s % 11 < 2 ? 0 : 11 - (s % 11)), r == d.charAt(1);
  }
  
  function closeModal(e) {
    e.removeAttribute("style"),
      (document.getElementsByTagName("body")[0].style.overflow = "");
  }
  
  var smoothScroll = function (e, t, n) {
    if (((t = Math.round(t)), 0 > (n = Math.round(n))))
      return Promise.reject("bad duration");
    if (0 === n) return (e.scrollTop = t), Promise.resolve();
    var a = Date.now(),
      o = a + n,
      r = e.scrollTop,
      l = t - r;
    return new Promise(function (t, n) {
      var s = e.scrollTop,
        i = function () {
          var n = Date.now(),
            c = (function (e, t, n) {
              if (e >= n) return 0;
              if (n >= t) return 1;
              var a = (n - e) / (t - e);
              return a * a * (3 - 2 * a);
            })(a, o, n),
            u = Math.round(r + l * c);
          return (
            (e.scrollTop = u),
            n >= o
              ? void t()
              : e.scrollTop === s && e.scrollTop !== u
              ? void t()
              : ((s = e.scrollTop), void setTimeout(i, 0))
          );
        };
      setTimeout(i, 0);
    });
  };
  
  (gtModals = [].slice.call(document.getElementsByClassName("gt-modal"))),
    (modals = [].slice.call(document.querySelectorAll("[data-modal]"))),
    (askers = [].slice.call(document.querySelectorAll("[data-ask]"))),
    (as = [].slice.call(document.getElementsByTagName("a"))),
    (closes = [].slice.call(document.getElementsByClassName("close"))),
    (deletes = [].slice.call(document.getElementsByClassName("deleter"))),
    (bars = [].slice.call(document.getElementsByClassName("bar"))),
    (toValidate = [].slice.call(document.querySelectorAll("[data-validate]"))),
    (dropdowns = [].slice.call(
      document.querySelectorAll(
        ".dropdown, .dropdown-right, .dropdown-left, .dropup, .dropup-left, .dropup-right"
      )
    )),
    (menuToggles = [].slice.call(document.getElementsByClassName("menu-toggle"))),
    (tooltips = [].slice.call(document.querySelectorAll("[data-tooltip]"))),
    tooltips.forEach(function (e) {
      tooltip(e);
    }),
    menuToggles.forEach(function (e) {
      menuToggle(e);
    }),
    bars.forEach(function (e) {
      bar(e);
    }),
    closes.forEach(function (e) {
      close(e);
    }),
    deletes.forEach(function (e) {
      deleter(e);
    }),
    dropdowns.forEach(function (e) {
      makeDropdown(e);
    }),
    as.forEach(function (e) {
      makeA(e);
    }),
    askers.forEach(function (e) {
      ask(e);
    }),
    toValidate.forEach(function (e) {
      formater(e), validates(e), switchValidations(e);
    }),
    document.addEventListener("click", function () {
      closeMenus(), closeDropdowns();
    }),
    gtModals.forEach(function (e) {
      e.addEventListener("click", function (t) {
        t.stopPropagation(),
          (-1 < t.target.className.indexOf("gt-modal") ||
            -1 < t.target.className.indexOf("modal-close")) &&
            closeModal(e);
      });
    }),
    document.addEventListener("keydown", function (e) {
      27 == e.keyCode &&
        gtModals.forEach(function (e) {
          e.removeAttribute("style"),
            (document.getElementsByTagName("body")[0].style.overflow = "");
        });
    }),
    modals.forEach(function (e) {
      e.addEventListener("click", function (t) {
        var n = document.getElementById(e.dataset.modal);
        (n.parentElement.style.display = "block"),
          (document.getElementsByTagName("body")[0].style.overflow = "hidden");
        var a = [].slice.call(
            n.querySelectorAll(
              "button, [href], input, select, textarea, [tabindex]"
            )
          ),
          o = a[0],
          r = a[a.length - 1];
        o.focus(),
          o.addEventListener("keydown", function (e) {
            e.shiftKey && "Tab" == e.key && (e.preventDefault(), r.focus());
          }),
          r.addEventListener("keydown", function (e) {
            e.shiftKey || "Tab" != e.key || (e.preventDefault(), o.focus());
          });
      });
    });
  
  // Modal functions
  function openModal(modalId) {
    document.getElementById(modalId).classList.add('show');
    document.body.style.overflow = 'hidden'; // Previne rolagem do body
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
    document.body.style.overflow = ''; // Restaura rolagem do body
  }
  
  // Inicializa todos os modais da página
  document.addEventListener('DOMContentLoaded', function() {
    // Setup para botões que abrem modais
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        openModal(modalId);
      });
    });
    
    // Setup para botões que fecham modais
    const closeButtons = document.querySelectorAll('.gt-modal-close');
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const modal = this.closest('.gt-modal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
      });
    });
    
    // Fechar modal ao clicar fora
    const modals = document.querySelectorAll('.gt-modal');
    modals.forEach(modal => {
      modal.addEventListener('click', function(event) {
        if (event.target === this) {
          this.classList.remove('show');
          document.body.style.overflow = '';
        }
      });
    });
  });
  