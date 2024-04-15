$(document).ready(function() {
    
    $('.info-btn').hover(function() {
        var infoText = $(this).data('info');
        $(this).after('<div class="info-tooltip">' + infoText + '</div>');
    }, function() {
        $('.info-tooltip').remove(); // Remove info tooltip on hover out
    });
    
    $('#taxForm').submit(function(event) {
        
        event.preventDefault();
        $('.invalid-feedback').removeClass('active'); // Hide all error messages
        
        let grossIncome = parseFloat($('#grossIncome').val()) || 0;
        let extraIncome = parseFloat($('#extraIncome').val()) ;
        let deductions = parseFloat($('#deductions').val()) ;
        let age = $('#age').val();

        if (!grossIncome || grossIncome < 0) {
            $('#grossIncome').next('.invalid-feedback').addClass('active');
            return;
        }

        if (!extraIncome || extraIncome < 0) {
            $('#extraIncome').next('.invalid-feedback').addClass('active');
            return;
        }

        if (!deductions || deductions < 0) {
            $('#deductions').next('.invalid-feedback').addClass('active');
            return;
        }

        if (!age) {
            $('#age').next('.invalid-feedback').addClass('active');
            return;
        }

        let taxableIncome = (grossIncome + extraIncome) - deductions;
        let taxAmount = 0;

        if (taxableIncome > 800000) {
            if (age === '<40') {
                taxAmount = 0.3 * (taxableIncome - 800000);
            } else if (age === '>=40 <60') {
                taxAmount = 0.4 * (taxableIncome - 800000);
            } else if (age === '>=60') {
                taxAmount = 0.1 * (taxableIncome - 800000);
            }
        }

        $('#resultBody').html(`
            <p>Overall Income: ₹ ${taxableIncome.toFixed(2)}</p>
            <p>Tax Amount: ₹ ${taxAmount.toFixed(2)}</p>
            <p>Net Income after Tax: ₹ ${(taxableIncome - taxAmount).toFixed(2)}</p>
        `);

        $('#resultModal').modal('show');
    });
});
