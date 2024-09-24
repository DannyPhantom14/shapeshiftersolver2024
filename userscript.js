// ==UserScript==
// @name         Neopets - Shapeshifter Script Maker
// @match        https://www.neopets.com/medieval/shapeshifter.phtml*
// @version      1.1
// @description  Script to generate Neopets Shapeshifter scripts
// @namespace https://github.com/DannyPhantom14/shapeshiftersolver2024
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
    function getDeltas() {
        var pieces = {};
        var items = $("table[border=1][bordercolor='gray']").find("img[name='i_']:not(:last)").get();
        items.splice(0, 0, items.pop()); // Move the last item to the front
        $(items).each(function(index, element) {
            pieces[$(element).attr("src").slice(0, 52)] = index; // Use slice for safety
        });
        return pieces;
    }

    var deltas = getDeltas();

    function tableScripter(table) {
        var lines = [];
        table.find("tr").each(function(index, row) {
            var line = '';
            $(row).find("td").each(function(colIndex, cell) {
                line += $(cell).find("img").length;
            });
            lines.push(line);
        });
        return "'" + lines.join() + "'";
    }

    function getShapes() {
        var shapes = [];
        $($("big")[1]).parent().parent().find("table[cellpadding='0']").each(function(index, shapeTable) {
            shapes.push(tableScripter($(shapeTable)));
        });
        return shapes.length ? "pieces = [" + shapes.join(", ") + "]" : ""; // Handle no shapes
    }

    function getBoard() {
        var lines = [];
        $("table[align=center][cellpadding=0][cellspacing=0][border=0]").find("tr").each(function(index, row) {
            var line = '';
            $(row).find("img").each(function(imgIndex, img) {
                line += deltas[$(img).attr("src").slice(0, 52)] || '0'; // Return 0 if delta doesn't exist
            });
            lines.push(line);
        });
        return "board = Board('" + lines.join() + "', " + (Object.keys(deltas).length - 1) + ")";
    }

    // Click event to copy code to clipboard
    $(document).on("click", "#copy", function() {
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(getBoard() + "\n" + getShapes()).select();
        document.execCommand("copy");
        $temp.remove();
        $("#copy").fadeOut();
    });

    // Add copy button after the target table
    $("table[border=1][bordercolor='gray']").after("<p><center><button id='copy'>Copy Board Code</button></center>");
})();
