$(document).ready(function() {
//total of source fund starts ends here
    calculatevalues()
    chartdata()
    chartdatasecond()
//total of source funds and application fund ends here

//edit & update code starts here
    $("tbody tr td").on('click', function() {
        var inptval = $(this).text()
        if (inptval != '' && (inptval[inptval.length - 1] === "%" || !isNaN(inptval))) {
            $(this).html('<input type="text" value="' + inptval + '" class = "fout" title = "Please Enter After Edit"/>')
            $(".fout").addClass('foutstyle')
            $(".fout").focus()
        }
    })
    $("body").on('keypress', '.fout', function(e) {
        var p = e.which;
        if (p == 13) {
            var otptval = $(this).val()
            $(this).parent('td').text(otptval)
            calculatevalues()
            chartdatasecond()
            chartdata()
        }
    })

//    $("body").on("focusout",".fout",function(){
//        var val = parseFloat($(this).val())
//        $(this).parent("td").text(val)
//    })




//    edit and update code ends here


})

//this function to calculate values of both source and application of funds
function calculatevalues() {
    //for multiplication and getting result of interest rate amount
    var l = 0
    var t1 = $(".table1 tbody tr")
    var len = t1.length
    $(".table1 tbody tr").each(function() {
        if (l != (len - 1)) {
            var FU = $(this).children("td:eq(1)").text()
            var IR = $(this).children("td:eq(2)").text()
            var IA = (FU * parseInt(IR)) / 100
            $(this).children("td:eq(3)").text(IA)
        }
    })

    //for total in source fund
    var i = 0
    var subtotal = 0
    t1.each(function() {
        if (i != (len - 1)) {
            subtotal += +$(this).children("td:eq(1)").text()
        }
        i++
    })

    $(".table1 tbody tr:last").children("td:eq(1)").text(subtotal)

//for total in application fund
    var j = 0
    var t2 = $(".table2 tbody tr")
    var len2 = t2.length
    var subtotal2 = 0
    t2.each(function() {
        if (j != (len2 - 1)) {
            subtotal2 += +$(this).children("td:eq(1)").text()
        }
        j++
    })
    $(".table2 tbody tr:last").children("td:eq(1)").text(subtotal2)

//    for amount in source fund
    var k = 0
    var t1 = $(".table1 tbody tr")
    var len = t1.length
    var subtotal1 = 0
    t1.each(function() {
        if (k != (len - 1)) {
            subtotal1 += +$(this).children("td:eq(3)").text()
        }
        k++
    })
    var subtotal1 = subtotal1.toFixed(2);
    $(".table1 tbody tr:last").children("td:eq(3)").text(subtotal1)

    //    calculation of interest rate s starts here
//    var t1last = $(".table1 tbody tr:last").children("td:eq(1)").text();
    var t1last = subtotal  //this()subtotal is coming from previous .each function 
//    var t2last = $(".table2 tbody tr:last").children("td:eq(1)").text();
    var t2last = subtotal2  //this()subtotal is coming from previous .each function 
    var IR = t1last - t2last
    var FR = IR * 100
    var FI = FR / t1last
    var FO = FI.toFixed(2);
    if (FO > 0) {
        $(".interest-rate p span").text(FO + "%")
        $(".interest-rate p label").text("Up By")
    } else {
        $(".interest-rate p span").text(FO + "%")
        $(".interest-rate p label").text("Down By")
    }
    //    calculation of interest rate s ends here

    //this function is for highlighting the highest interest value
    highlightRow()
}

function highlightRow() {
    var max = 0
    var row = 0
    $(".val").each(function() {
        $(this).parent("tr").removeClass("selected-row")
        var txt = $(this).text()
        var $this = parseFloat(txt)
        if ($this > max) {
            max = $this;
            row = $(this).attr("id")
        }
    })
    $("#" + row).parent("tr").addClass("selected-row")


    var maxi = 0
    var rowi = 0
    $(".val1").each(function() {
        $(this).parent("tr").removeClass("selected-row")
        var $thisi = parseFloat($(this).text())
        if ($thisi > maxi) {
            maxi = $thisi;
            rowi = $(this).attr("id")
        }
    })
    $("#" + rowi).parent("tr").addClass("selected-row")

}

function chartdata() {
    var data1 = []
    var data2 = []
    var i = 0
    var t1 = $(".table1 tbody tr")
    var len = t1.length
    t1.each(function() {
        if (i != (len - 1)) {
            data1.push($(this).children("td:eq(1)").text())
            data2.push($(this).children("td:eq(3)").text())
//                        alert($(this).children("td:eq(1)").find("input").val())
        }
        i++
    })

    var barChartData = {
        labels: ["Terms Loan", "Owners Equity", "Working Capital", "Over Draft", "Inventory Funding", "Cash Credit", "Other"],
        datasets: [
            {
                fillColor: "rgba(80,171,252,0.5)",
                strokeColor: "rgba(80,171,252,1)",
                data: data1
            },
            {
                fillColor: "rgba(35,130,212,0.5)",
                strokeColor: "rgba(35,130,212,1)",
                data: data2
            }
        ]
    }
    var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData);
}

function chartdatasecond() {
    var i = 0
    var t2 = $(".table2 tbody tr")
    var data3 = []
    var len = t2.length
    t2.each(function() {
        if (i != (len - 1)) {
            data3.push($(this).children("td:eq(1)").text())
        }
        i++
    })
    var barChartData = {
        labels: ["Fixed Assets", "Investments", "Receivables", "Inventory help-up cost", "Cash In Hand", "Cash In Bank", "Other Assets"],
        datasets: [
            {
                fillColor: "rgba(20,156,128,0.5)",
                strokeColor: "rgba(20,156,128,1)",
                data: data3
            }
        ]
    }
    var myLine = new Chart(document.getElementById("canvas-second").getContext("2d")).Bar(barChartData);
}