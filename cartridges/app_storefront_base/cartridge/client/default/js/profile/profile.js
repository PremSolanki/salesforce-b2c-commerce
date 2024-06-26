'use strict';

var formValidation = require('../components/formValidation');

var location = window.location;

module.exports = {
    submitProfile: function () {
        $('form.edit-profile-form').submit(function (e) {
            var $form = $(this);
            e.preventDefault();
            var files = document.getElementById("profileImage").files;
            var base64enc ='';
            if (files.length > 0) {

                var reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onloadend = function() {
                    console.log('RESULT', reader.result);
                    base64enc = reader.result;

                    var url = $form.attr('action');
                    $form.spinner().start();
                    $('form.edit-profile-form').trigger('profile:edit', e);
                    $.ajax({
                        url: url,
                        type: 'post',
                        dataType: 'json',
                        data: $form.serialize()+"&par1="+base64enc,
                        success: function (data) {
                            $form.spinner().stop();
                            if (!data.success) {
                                formValidation($form, data);
                            } else {
                                location.href = data.redirectUrl;
                            }
                        },
                        error: function (err) {
                            if (err.responseJSON.redirectUrl) {
                                window.location.href = err.responseJSON.redirectUrl;
                            }
                            $form.spinner().stop();
                        }
                    });
                    return false;
                }
            }

        });
    },

    submitPassword: function () {
        $('form.change-password-form').submit(function (e) {
            var $form = $(this);
            e.preventDefault();
            var url = $form.attr('action');
            $form.spinner().start();
            $('form.change-password-form').trigger('password:edit', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                success: function (data) {
                    $form.spinner().stop();
                    if (!data.success) {
                        formValidation($form, data);
                    } else {
                        location.href = data.redirectUrl;
                    }
                },
                error: function (err) {
                    if (err.responseJSON.redirectUrl) {
                        window.location.href = err.responseJSON.redirectUrl;
                    }
                    $form.spinner().stop();
                }
            });
            return false;
        });
    }
};
