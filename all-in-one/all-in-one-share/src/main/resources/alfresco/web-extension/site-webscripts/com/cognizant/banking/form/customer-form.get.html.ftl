<div id="customer-form-widget" class="customer-form-widget">
    <h3>${msg("customer.form.title")! "Create Customer"}</h3>

    <form id="customerForm" action="#" method="post" accept-charset="utf-8">
        <div class="yui-g">
            <div class="yui-u first">
                <label for="customerId">Customer Id *</label><br/>
                <input type="text" id="customerId" name="customerId" />
            </div>
            <div class="yui-u">
                <label for="customerName">Customer Name</label><br/>
                <input type="text" id="customerName" name="customerName" />
            </div>
            <div class="yui-u">
                <label for="dob">DOB</label><br/>
                <input type="date" id="dob" name="dob" />
            </div>
        </div>
        <div style="margin-top:12px;">
            <button id="pf-submit" class="yui-button yui-push-button" type="submit">
                ${msg("customer.form.submit")!"Submit"}
            </button>
        </div>
    </form>
</div>