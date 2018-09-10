<%
    my $error;

    if  ( $Request->Form('send') ) {
            #if we dont have data we have error (in html)
        $error  = "Invalid argument.<br>Please try again";
            #request for username and password
        if  ( $Request->Form('loginUsername') && $Request->Form('loginPassword') ){
                #connect to db
            my $dbh = connect_db();
                #with prepare method ,connect $sth with the query through $dbh
            my $sth = $dbh->prepare(qq[SELECT id FROM filmaniacs_gr.admin WHERE username = ? AND password = ?]) || die $dbh->errstr;
                    # execute loginPassword and loginUsername and send these values in the placeholder ? of the query
                $sth->execute( $Request->Form('loginUsername'), $Request->Form ( 'loginPassword' ) );
                #save into data, the result of fetching $sth
            while ( my $data = $sth->fetch ) {
                    #save admin_id in a session
                $Session->{admin_id} = $data->[0];
                    #if i have data, clear the $error and print nothing.
                $error = "";
                        }
                #disconnect db
            $dbh->disconnect;
        }
    }
    #if i am logout delete the session.
    elsif  ( $Request->Form('loggedOut') ) {
        delete $Session->{admin_id};
    }
    #if i am login create in dist directory an index.html file.
    if ( amilogin () ) {
        $Response->Include('dist/index.html');
    }
        #if i am not login..Post the login form
        # the html file here is just a string in a print.
    else  {
        print qq[
            <!Doctype html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <title>FilManiacs</title>
                    <meta name="description" content="This is a description of my web site">
                    <meta name="author" content="Teti">
                    <link rel="stylesheet" type="text/css" href="css/filmaniacs.css">
                </head>
                <body>
                    <div class="header"></div>

                    <form class="login-form" name="admin" method="post" autocomplete="off" action="/admin/">
                        <input type="hidden" name="send" value="1" />
                        <h1>// Admin</h1>
                        <div class="input-wrapper">
                            <input class="form-input" type="username" name="loginUsername" placeholder="">
                            <label>Username</label>
                        </div>
                        <div class="input-wrapper">
                            <input class="form-input" type="password" name="loginPassword" placeholder="">
                            <label>Password</label>
                        </div>
                        <button type="submit">Login</button>
                        <div class="error">$error</div>
                    </form>

                    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
                    <script type="text/javascript" src="js/myjs.js"></script>
                </body>
            </html>
        ];
    }
%>
