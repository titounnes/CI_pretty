function eventKey(e) {
  switch (e.attr('text-type')) {
    case 'search':
      filterShow(e.val());
      break;
    case 'text-token':
      $('#message-token').html('');
      break;
    default:
      if (e.hasClass('form-cell')) {
        if (e.prop('name').indexOf('[') >= 0) {
          var active = e.prop('name').replace('[', '|').replace(']', '').split('|');
          obj = openStorage(activeGrid);
          obj.data[active[1]].edited = true;
          obj.data[active[1]][active[0]] = e.val();
          saveStorage(obj.data, activeGrid);
        }
      }
      break;
  }
}
$(document).on('click', '.treeview a', function() {
  if ($(this).attr('data-target') == null) {
    var sister = $(this).parent().children();
    var open = $(sister[1]).hasClass('menu-open');
    var level = $(this).attr('level');
    var child = $(this).children();
    $('.menu-open').removeClass('menu-open')
      .css('display', 'none');
    if (open) {
      $(sister[1]).removeClass('menu-open')
      $(sister[1]).css('display', 'none')
      $(child[1]).removeClass('fa-angle-down')
      $(child[1]).addClass('fa-angle-left')
    } else {
      $(sister[1]).addClass('menu-open')
      $(sister[1]).css('display', 'block')
      $(child[1]).removeClass('fa-angle-left')
      $(child[1]).addClass('fa-angle-down')
    }
    var obj = $(this);
    for (i = 0; i < level; i++) {
      obj = toggleMenu(obj);
    }
  }
})
$(document).on('click', '.btn-ajax-page', function(e) {
  e.preventDefault();
  objTriger = $(this);
  $('#workspace').html('Loading....')
  getLib('showGrid', 'grid');
})
$(document).keydown(function(e) {
  switch (e.which) {
    case 17:
      ctrlDown = true;
      break;
    case 16:
      shiftDown = true;
      break;
    case 18:
      altDown = true;
      break;
  }
})
$(document).keyup(function(e) {
  switch (e.which) {
    case 17:
      ctrlDown = false;
      break;
    case 16:
      shiftDown = false;
      break;
    case 18:
      altDown = false;
      break;
    case 83:
      sKeyUp(e);
      break;
    case 78:
      nKeyUp(e);
      break;
    case 67:
      //cKeyUp(e);
      break;
    case 33:
    case 38:
    case 39:
      pgUp(e);
      break;
    case 34:
    case 37:
    case 40:
      pgDown(e);
      break;
    case 27:
      modalHide();
      break;
    case 113:
      modalView();
      break;
  }
})
$(document).on('mouseover click focus', '.select-primary', function() {
  if (typeof $(this).attr('target') == 'undefined') {
    return false;
  }
  if ($(this).children('option').length == 1) {
    loadSelect($(this).attr('target'), param, $(this));
  }
})
$(document).on('change', '#rowPerPage', function() {
  rows = $(this).val() * 1;
  localStorage['rows'] = rows;
  obj = openStorage(activeGrid);
  renderGrid(obj.data);
})
$(document).on('mouseover click focus', '.select-grid', function() {
  if ($(this).children('option').length == 1) {
    loadSelect($(this).attr('target'), param, $(this));
  }
})
$(document).on('change', '.swapper-switch', function() {
  $('#sidebar').html(menuTree(menus[$(this).val()], $(this).val(), 0));
  $('#sidebar').prepend('<li class="header">MAIN NAVIGATION </li>');
})
$(document).on('change', '.select-primary', function() {
  head = head.replace(/==subtitle==/, $("option:selected", this).text());
  var before = true;
  var current = $(this).prop('name');
  $('.select-primary').each(function(i, v) {
    if (i == 0 && i < $('.select-primary').length - 1) {
      $('#tableBody').html('');
    }
    if ($(this).prop('name') == current) {
      before = false;
      if (i + 1 < $('.select-primary').length) {
        show = false;
      } else {
        show = true;
      }
    } else {
      if (before == false) {
        if (typeof $(this).attr('target') != 'undefined') {
          var opt = $(this).children('option')[0];
          $(this).children('optgroup').remove();
          $(this).children('option').remove();
          $(this).append(opt)
        } else {
          $(this).val(0);
        }
      }
    }
    var optName = $(this).prop('name').split('-');
    var optVal = $(this).val().split('_');
    $.each(optName, function(i, v) {
      param[v] = optVal[i];
    })
  })
  if (show) {
    if ($(this).val() == '' || $(this).val() == '0') {
      $('#tableHead').hide();
      $('#page-bar').hide();
      $('#button-bar').hide();
      $('#search-bar').hide();
      $('#tableBody').html('');
      return false;
    }
    loadGrid($(this));
  }
})
$(document).on('click', '.link', function(e) {
  e.preventDefault();
  $('#text-body').hide();
  if ($(this).attr('type') == 'btn-exit') {
    clearHome();
    logingOut();
  } else {
    getLib('authForm','form',$(this).attr('target'));
  }
})
$(document).on('click', '.fa-eye', function() {
  var obj = $(this).parent().parent().children('input');
  if (obj.attr('type') == 'text') {
    obj.attr('type', 'password')
  } else {
    obj.attr('type', 'text')
  }
})
$(document).on('click', '.btn', function(e) {
  e.preventDefault();
  if ($(this).attr('type') != 'submit') {
    objTriger = $(this);
  }
  data = {};
  switch ($(this).attr('type')) {
    case 'btn-save':
      obj = openStorage(activeGrid);
      var str = '{&';
      $.each(obj.data, function(i, v) {
        if (v.edited == true) {
          $.each(v, function(j, w) {
            if (j != 'id') {
              str += j + '[' + v.id + ']=' + w + '&';
            }
          })
        }
      })
      str += '}';
      submission(str);
      break;
    case 'btn-import' :
      getLib('massInputOpen','massInput');
      break;
    case 'btn-save-mass' :
      saveMass();
      break;
    case 'btn-addnew':
      getLib('formOpen','form');
      break;
    case 'btn-save-one':
      //formValidation();
      //$('#form-single').validate(role);
      //$('#validate').click();
      //if (validForm == true) {
        showAlert('','Permintaan sedang diproses... mohon tunggu beberapa saat ')
        submission($('#form-single').serializeArray());
      //}
      break;
    case 'btn-confirm':
      submission($(this).attr('target'));
      break;
    case 'btn-reset':
    case 'btn-delete':
      getLib('confirmation','confirmation');
      break;
    case 'btn-close':
      $(this).hide();
      $('#myModal').modal('hide');
      $('#popup').hide();
      $('.selected').removeClass('selected');
      break;
    case 'btn-edit':
    case 'btn-read':
      getLib('loadText','reader');
      break;
    case 'btn-add':
      getLib('addItem','add');
      break;
    case 'btn-first':
      goFirst();
      break;
    case 'btn-prev':
      goPrev();
      break;
    case 'btn-next':
      goNext();
      break;
    case 'btn-last':
      goLast();
      break;
    case 'btn-quiz':
      getLib('quiz','quiz');
      break;
    case 'btn-print':
      getLib('printing','printingLib');
      break;
    case 'btn-printout':
      var target = $(this).attr('target').split('/');
      var type = target[2].split('_');
      if (typeof directPrintLib == 'undefined') {
        $.getScript(baseUrl('config/directPrint/' + type[0])).done(function() {
          directPrint(e);
        })
      } else {
        directPrint(e);
      }
      break;
    case 'btn-setting':
      setting();
      break;
    case 'btn-import':
      importing();
      break;
    case 'btn-preview':
      printPDF = 'ledger';
      printing(true);
      break;
    case 'btn-xls':
      download();
      break;
    case 'btn-assessment':
      getLib('assessment','assessment');
      break;
    case 'close-assessment':
      closeAssessment();
      break;
    case 'close-quiz':
      runTest = false;
      closeQuiz();
      break;
    case 'btn-option':
      current = $(this).attr('target');
      viewItems($(this));
      break;
    case 'btn-sure':
      signing();
      break;
    case 'btn-ok':
      cekToken();
      break;
    case 'btn-number':
      current = $(this).attr('target');
      showQuestion();
      break;
    case 'btn-analysis':
      statistic();
      break;
    case 'difficulty':
      difficulty();
      break;
    case 'discriminant':
      discriminant();
      break;
    case 'validity':
      validity();
      break;
    case 'reliability':
      reliability();
      break;
    case 'predictor':
      predictor();
      break;
    case 'print-preview':
      printPreview();
      break;
    case 'btn-nav':
      if ($(this).attr('target') == 'prev') {
        gotoPrev($(this));
      } else {
        gotoNext($(this));
      }
      break;
  }
})
$(document).on('change blur change keyup', '.form-control', function(e) {
  eventKey($(this));
})
$(document).on('click', '.option-answer', function() {
  answer($(this));
})
$(document).on('blur','.form-cell',function(){
  $('#validate').click()
})
$(document).on('click', '.radio-option', function() {
  comments = $('#comment').val().split(' ');
  var ok = 0;
  for (i = 0; i < comments.length; i++) {
    if (comments[i].trim().length > 2) {
      ok++;
    }
  }
  if (ok < 3) {
    $('#comment').focus();
    $(this).prop('checked', false);
    showAlert('warning', 'Komentar minimal 3 kata');
  } else {
    sendAssessment($(this));
  }
})
$(document).on('click', '.cke_button', function(e) {
  e.preventDefault();
  if ($(this).hasClass('cke_button__save')) {
    objTriger = $(this);
    saveEditor();
    return false;
  }
  if ($(this).hasClass('cke_button__closebtn')) {
    modalHide();
    return false;
  }
})
$(document).on('mouseover', '#tooltip', function() {
  $(this).hide();
})
var numberActive = '';
$(document).on('focus', '.number', function() {
  numberActive = $(this).attr('name');
})
$(document).on('blur', '.number', function() {
  if ($(this).attr('name') != numberActive) {
    return false;
  }
  var numbers = ['daily', 'remidial', 'midle', 'final', 'project', 'perform', 'portfolio'];
  numberActive = '';
  var max = $(this).attr('max') * 1;
  var min = $(this).attr('min') * 1;
  var nameField = $(this).attr('name').split('[')
  var tot = 0;
  var count = 0;
  var row = $(this).attr('row');
  obj = openStorage(activeGrid)
  obj.data[row][nameField[0]] = $(this).val();
  if ($(this).val() * 1 > max) {
    $(this).val(max);
    obj.data[row][nameField[0]] = max;
  }
  if ($(this).val() * 1 < min && $(this).val() * 1 != 0) {
    $(this).val(min);
    obj.data[row][nameField[0]] = min;
  }
  $.each(obj.data[row], function(i, v) {
    if (numbers.indexOf(i) >= 0) {
      tot += v * 1;
      if (v * 1 > 0) {
        count++;
      }
    }
  })
  var mean = count == 0 ? '' : Math.round(tot / count);
  obj.data[row]['mean'] = mean;
  saveStorage(obj.data, activeGrid);
  $('[name="mean[' + row + ']"').val(mean);
})
$(document).on('click', '.fa-eye', function() {
  if ($('input[name=password]').attr('type') == 'password') {
    $('input[name=password]').attr('type', 'text');
  } else {
    $('input[name=password]').attr('type', 'password');
  }
})
