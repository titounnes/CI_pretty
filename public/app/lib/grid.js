var d = new Date();
var year = d.getFullYear();
var month = d.getMonth();
var day = d.getDate();
var today = new Date();
var now = new Date();
var minDate = new Date(year, month - 3, day)
var maxDate = new Date(year, month + 6, day)
var panelSearch;
var panelButton;
var tableHead;
var tableBody;
var panelNav;
function dateFormal(data) {
  var year = data.getFullYear();
  var month = data.getMonth();
  var day = data.getDate();
  return year + '-' + ('0' + month).substr(-2, 2) + '-' + ('0' + day).substr(-2, 2);
}
function dateTimeFormal(data) {
  var year = data.getFullYear();
  var month = data.getMonth();
  var day = data.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  return year + '-' + ('0' + month).substr(-2, 2) + '-' + ('0' + day).substr(-2, 2) + 'T' + ('0' + hour).substr(-2, 2) + ':' + ('0' + minute).substr(-2, 2);
}
function dateNonFormal(data) {
  var year = data.getFullYear();
  var month = data.getMonth();
  var day = data.getDate();
  return day + '-' + month + '-' + year;
}
minDateFormal = dateFormal(minDate);
maxDateFormal = dateFormal(maxDate);
today = dateFormal(today);
now = dateTimeFormal(now);
var message = 'Waktu bisa diset dari tanggal ' + dateNonFormal(minDate) + ' hingga ' + dateNonFormal(maxDate);
function showView() {
  var viewContent = '<h3 class="text-info text-center">' + viewItem.title + '</h3>';
  if (typeof viewItem.dropdown != 'undefined') {
    viewContent += '<div id="dropdown-bar" class="input-group">';
    $.each(viewItem.dropdown.primary, function(i, v) {
      viewContent += '<span class="input-group-addon"><i class="fa fa-caret-down"></i></span>';
      if (typeof v.target != 'undefined') {
        viewContent += '<select name="' + v.name + '" target="' + v.target + '"" class="select select-primary form-control">';
        viewContent += '<option value="">' + v.label + '</option></select>';
      } else {
        if (typeof v.option != 'undefined') {
          viewContent += '<select name="' + v.name + '" class="select select-primary form-control">';
          $.each(v.option, function(j, w) {
            if (typeof w == 'object') {
              viewContent += '<optgroup label="' + w.label + '">';
              $.each(w.data, function(k, x) {
                viewContent += '<option value="' + k + '">' + x + '</option>';
              })
              viewContent += '</optgroup>';
            } else {
              viewContent += '<option value="' + j + '">' + w + '</option>';
            }
          })
          viewContent += '</select>';
        }
      }

    })
    viewContent += '</div>';
    if (typeof viewItem.dropdown.secondary != 'undefined') {
      var v = viewItem.dropdown.secondary
      viewContent += '<div id="dropdown-multiple" class="input-group">';
      viewContent += '<span class="input-group-addon"><i class="fa fa-caret-down"></i></span>';
      viewContent += '<select name="' + v.name + '" target="' + v.target + '"" class="select select-multiple form-control" multiple>';
      viewContent += '<option value="">' + v.label + '</option></select><a href="#" class="btn btn-default input-group-addon" type="btn-add"><i class="fa fa-plus"></i></a></div>';
    }
  }
  viewContent += '<div class="row"><div class="col-sm-6"><span id="search-bar" class="input-group"></span></div><div class="col col-sm-6"><span id="page-bar" class="input-group pull-right"></span></div></div>';
  viewContent += '<div id="button-bar" class="input-group" style="margin:auto"></div>';
  panelSearch = '<input type="text" id="text-search" text-type="search" placeholder="Pencarian" class="form-control" value=""><span class="input-group-addon"><i class="fa fa-search"></i></span>';
  panelButton = '';
  if (typeof viewItem.hidden != 'undefined') {
    if (typeof hidden != 'undefined') {
      viewContent += '<input type="hidden" id="hidden" name="' + viewItem.hidden.name + '" value="' + hidden[activeGrid] + '">';
    }
  }
  $.each(viewItem.button, function(i, v) {
    panelButton += '<a href="#" target="' + v.target + activeGrid + '" id="btn-' + i + '" class="btn btn-default btn-grid' + (typeof v.class == 'undefined' ? '' : ' ' + v.class) + '" type="btn-' + i + '"><span class="fa ' + v.icon + '"></span> <span class="minimize">' + v.label + '</span></a>';
  })
  viewContent += '<div class="table-responsive" id="table" target="' + viewItem.target + activeGrid + '"><form id="form-table"><table class="table table-condensed"><thead id="tableHead"></thead><tbody id="tableBody"></tbody></table></form></div>';
  tableHead = '<tr><th>#</th>';
  $.each(viewItem.head, function(i, v) {
    tableHead += '<th>' + v + '</th>';
  })
  tableHead += '</tr>';
  panelNav = '<a href="#" type="btn-first" class="btn btn-default btn-backward input-group-addon" disabled=""><span class="fa fa-angle-double-left"></span></a><a href="#" type="btn-prev" class="btn btn-default btn-backward input-group-addon" disabled=""><span class="fa fa-angle-left"></span></a><span id="offset" class="form-control text-center">Hal 1 dari 2</span><a href="#" type="btn-next" class="btn btn-forward btn-default input-group-addon"><span class="fa fa-angle-right"></span></a><a href="#" type="btn-last" class="btn btn-default btn-forward input-group-addon"><span class="fa fa-angle-double-right"></span></a>';
  $('#workspace').html(viewContent);
  if (typeof viewItem.dropdown == 'undefined') {
    $('#tableBody').html(tableHead);
    loadGrid();
  }
}
function loadGrid() {
  $('.select-multiple').html('');
  $('#tableBody').html('loading.....')
  sendRequest(pushGrid, $('#table').attr('target'), param)
}
function pushGrid(response) {
 setSession(response);
  saveStorage(responseToObj(response.data), activeGrid);
  if (response.jwt != false) {
    $('#btn-reset').show();
    var target = $('#table').attr('target').split('/');
    if (target[1] == 'pivot') {
      if (typeof statisticJS == 'undefined') {
        $.getScript(baseUrl('lib/statistic')).done(function() {
          pivot(response)
        })
      } else {
        pivot(response)
      }
      return false;
    }
    if (typeof(response.data) == 'undefined' && $('.select-multiple').length == 0) {
      $('#search-bar').html('');
      $('#button-bar').show('');
      if (response.new == true && objTriger.val() != '') {
        $('#btn-addnew').show();
      } else {
        $('#btn-addnew').hide();
      }
      $('#btn-save').hide();
      $('#page-bar').hide();
      return false;
    }
    var child = $('.select-multiple').children('option')[0];
    $('.select-multiple').html(child);
    offset = 0;
    totRow = countObj(response.data);
    $('#search-bar').html('');
    $('#page-bar').html('');
    $('#button-bar').html('');
    $('#tableHead').html('');
    $('#tableBody').html('');
    if (countObj(response.data) > 0) {
      $('#search-bar').html(panelSearch).show();
      $('#page-bar').html(panelNav).show();
      $('#button-bar').html(panelButton).show();
      $('#tableHead').html(tableHead).show();
      $('#tableBody').html(renderGrid());
    } else {
      $('#button-bar').html(panelButton).show();
      $.each($('.btn-grid'), function(i, v) {
        if ($(v).attr('type') != 'btn-addnew') {
          $(v).hide();
        } else {
          $(v).show();
        }
      })
      $('#tableBody').html('Data tidak ditemukan');
    }
    $('.select-primary').each(function(i, v) {
      $(v).attr('disabled', false)
    })
    if ($('.select-multiple').length > 0) {
      param[$('#hidden').prop('name')] = $('#hidden').val();
      loadSelect($('.select-multiple').attr('target'), param, $('.select-multiple'));
    }
  }
}
function inputAddon(input, icon) {
  var el = '<div class="input-group">';
  el += input;
  if (typeof icon != 'undefined' && icon != '') {
    el += '<span class="input-group-addon"><i class="fa fa-' + icon + '"></i></span>';
  }
  el += '</div>';
  return el;
}
/* navigation */
function goFirst() {
  if (first == false) {
    offset = 0;
    $('#tableBody').html(renderGrid());
  }
}

function goPrev() {
  if (first == false) {
    offset -= perpage;
    $('#tableBody').html(renderGrid());
  }
}
function goNext() {
  if (last == false) {
    offset += perpage;
    $('#tableBody').html(renderGrid());
  }
}
function goLast() {
  if (last == false) {
    offset = (Math.floor(countData / perpage)) * perpage;
    $('#tableBody').html(renderGrid());
  }
}
function showGrid(response){
  var target = objTriger.attr('target').split('/');
  activeGrid = target[2];
  getJSON('showView', getView(target[0],target[2]));
}
function filterShow(txtSearch) {
  var obj = openStorage(activeGrid);
  $.each(obj.data, function(i, v) {
    var txt = '';
    $.each(v, function(j, w) {
      if (j != 'vis') {
        txt += w;
      }
    })
    obj.data[i]['vis'] = txt.toLowerCase().indexOf(txtSearch.toLowerCase().trim()) < 0 ? false : true;
    countData += txt.toLowerCase().indexOf(txtSearch.toLowerCase().trim()) < 0 ? 0 : 1;
  })
  offset = 0;
  saveStorage(obj.data, activeGrid);
  $('#tableBody').html(renderGrid());
}
function renderGrid() {
  obj = openStorage(activeGrid);
  countData = countObj(obj.data);
  var number = 0;
  var row = '';
  if (offset + perpage > countData) {
    last = true;
    $('.btn-forward').attr('disabled', true);
  } else {
    last = false;
    $('.btn-forward').attr('disabled', false);
  }
  if (offset - perpage < 0) {
    first = true;
    $('.btn-backward').attr('disabled', true);
  } else {
    first = false;
    $('.btn-backward').attr('disabled', false);
  }
  var urut = 0;
  $.each(obj.data, function(i, v) {
    number++;
    if ((typeof v.vis == 'undefined' || v.vis == true) && urut < (perpage + offset) && number > offset) {
      urut++;
      row += '<tr class="row-top row_' + i + '">';
      if (typeof viewItem.action == 'undefined') {
        row += '<td width="10px">' + (offset+urut) + '</td>';
      } else {
        row += '<td width="10px" rowspan="2">' + (offset+urut) + '</td>';
      }
      if (typeof viewItem.grid.span != 'undefined') {
        $.each(viewItem.grid.span, function(k, x) {
          row += '<td><div>';
          $.each(x, function(l, y) {
            row += (typeof y.label == 'undefined' ? '' : ('<li><label>' + y.label + ': </label> '));
            row += (v[y.data] == '-' ? 'Belum diset' : v[y.data]) + '</li>';
          })
          row += '</div></td>';
        })
      } else {
        $.each(viewItem.grid, function(j, w) {
          row += '<td ' + (typeof w.align == 'undefined' ? '' : 'align="' + w.align + '"') + '>';
          w.field = j;
          w.data = v[j];
          w.selectedLabel = v['label_'+j];
          if(typeof w.type != 'undefined'){
            var myFunc = new Function("return cell"+ucfirst(w.type.replace(/-/,''))+"("+JSON.stringify(w)+","+v.id+")")
            row += myFunc();
          }
          console.log("cell"+ucfirst(w.type))
          row += '</td>';
        })
      }
      row += '</tr>';
      if (typeof viewItem.action != 'undefined') {
        row += '<tr><td colspan="' + countObj(v) + '" align="left">';
        $.each(viewItem.action, function(j, w) {
          var target = w.target;
          var url = w.target.split('/');
          if (url[2] == '') {
            target += activeGrid;
          }
          target += '/' + i;
          target = target.replace('//', '/');
          row += '<a href="#" class="btn btn-default' + (typeof w.class == 'undefined' ? '' : ' minimize') + '" target="' + target + '" id="' + activeGrid + '_' + i + '" type="' + w.type + '"><span class="' + w.icon + '"></span> <span class="minimize">' + w.label + '</span></a>';
        })
        row += '</td></tr>';
      }
    }
  })
  $('#offset').html('<span class="minimize"> Menampilkan hal </span>' + (offset / perpage + 1) + ' dari ' + Math.ceil(countData / perpage))
  return row;
}
