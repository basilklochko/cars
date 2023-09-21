var uiHelper = {
    loading: function() {
        $.blockUI({
            message: '<img src="/img/loading.gif" />',
            css: {
                border: 'none',
                backgroundColor: 'transparent',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .75,
            }
        });
    },
    loaded: function() {
        $.unblockUI();
    }
};
