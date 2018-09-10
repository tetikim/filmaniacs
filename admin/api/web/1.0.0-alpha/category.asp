<% 
    my $params;
    my $response;

    ## return html codes on error.


    # User is not logged in.
    if ( !amilogin() ){
        $Response->{Status} = 401;
    }
    # 3 types of request: 
    # $Request->Form($name) Returns the value of the input of name $name used in a form with POST method.If $name is not specified, it returns a hash reference of all the form data.
    # $Request->QueryString($name) Returns the value of the input of name $name used in a form with GET method. If $name is not specified, it returns a hash reference of all the query string data.
    # $Request->BinaryRead([$length]) Returns a string whose contents are the first $length bytes of the form data

    # A valid request has at least the action parameter in query string.
    # Worker send the data.Server catch the data with request.The reason we use querystring although we have post method is because its the only way to catch and understand tha data.

    if ( !$Request->QueryString('action') ) {
        $Response->{Status} = 400;
    }

    $params = JSON::XS::decode_json( $Request->Form('params') );

    #connect to db.
    my $dbh = connect_db();

    # Parse each action acordingly.
    if ( $Request->QueryString('action') eq 'add' ) {
        # if there is not parameter name in category table print error.
        # $params is a hash reference and we can understand it from ->. In that case name is the key..So if there is not key name print error.
        if  ( !$params->{name} ) {
            $Response->AddHeader("content-type", "application/json;charset=UTF-8");

            #calls code error from constants.pm 
            print JSON::XS::encode_json( { code => App::Filmaniacs::Constants::ERR_INVALID_CATEGORY_NAME(), description => "Invalid category name." } );
            $Response->End();
        }
        
        # You can not delete a row but only disable it.
        # Insert in table categories  name,  the value that admin gives, and return the id and the name.
        # the ? is the placeholder where the value of name will be inserted.
        # we prefer prepare and not do because its safer as regards the values.
        my $sth = $dbh->prepare(qq[INSERT INTO filmaniacs_gr.categories ( name ) VALUES ( ? ) RETURNING id, name ]);
      
        $sth->execute( $params->{name} ) || die $dbh->errstr;
        while ( my $data = $sth->fetch ) {
            $response = {
                id      => $data->[0],
                name    => $data->[1],
            };
        }
    }

    # if ( $Request->QueryString('action') eq 'add' ) {
    #     if (!$params->{title, description, date, new}) {
    #         $Response->AddHeader("content-type", "application/json;charset=UTF-8");

    #         print JSON::XS::encode_json( { code => App::Filmaniacs::Constants::ERR_INVALID_NEW2018_TITLE() ,description => "Invalid new2018 title." } );
    #         print JSON::XS::encode_json( { code => App::Filmaniacs::Constants::ERR_INVALID_NEW2018_DESCRIPTION(), description => "Invalid new2018 description." } );
    #         print JSON::XS::encode_json( { code => App::Filmaniacs::Constants::ERR_INVALID_NEW2018_DATE(), description => "Invalid new2018 date." } );
    #         print JSON::XS::encode_json( { code => App::Filmaniacs::Constants::ERR_INVALID_NEW2018_NEW(), description => "Invalid new2018 new." } );          
    #         $Response->End();
    #     }

    #     my $sth = $dbh->prepare(qq[INSERT INTO filmaniacs_gr.movies ( title, description, date, new ) VALUES ( ?, ?, ?, ? ) RETURNING id, title, description, date, new ]);
        
    #     $sth->execute( $params->{title, description, date, new} ) || die $dbh->errstr;
    #     while ( my $data = $sth->fetch ) {
    #     $response = {
    #             id           => $data->[0],
    #             title        => $data->[1],
    #             description  => $data->[2],
    #             date         => $data->[3],
    #             new          => $data->[4],
    #         };
    #     }
    # }

    #if action is list.
    if ( $Request->QueryString('action') eq 'list' ) {
        $response = [];
        #with prepare method ,connect $sth with the query through $dbh
        my $sth = $dbh->prepare(qq[SELECT id, name FROM filmaniacs_gr.categories ]);
        $sth->execute() || die $dbh->errstr;
        while ( my $data = $sth->fetch ) {
            push @{ $response }, {
                id      => $data->[0],
                name    => $data->[1],
            };
        } 
    }
    ########################## Is it correct?? ###########################
    #if action is update.
    elsif ( $Request->QueryString('action') eq 'update' ){
            $response = [];
            my $sth = $dbh->prepare(qq[ "UPDATE category.name FROM filmaniacs_gr.categories SET name = ? WHERE id = ?"]);
            $sth->execute( $params->{name} ) || die $dbh->errstr;
    }
    else {
            $Response->{Status} = 405;
    }
    $dbh->disconnect;


    # Print application json header.
    $Response->AddHeader("content-type", "application/json;charset=UTF-8");
    
    # Print response as json string.
    print JSON::XS::encode_json( $response );
%>




