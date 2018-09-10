package App::Filmaniacs::Constants;
use vars qw(@ISA @EXPORT @EXPORT_OK);
#############################################################
##  Inherit Exporter  ##
#############################################################
@ISA = (Exporter);
#############################################################
##  Export automatically!!!  ##
#############################################################
@EXPORT = qw();
#############################################################
##  Export only if user asks for it!!!  ##
#############################################################
@EXPORT_OK = qw();
#############################################################

use strict;
use warnings;

use base 'Exporter';

use constant {

#errors
ERR_INVALID_CATEGORY_NAME                    =>	-1,
ERR_INVALID_NEW2018_TITLE                    => -2,
ERR_INVALID_NEW2018_DESCRIPTION              => -3,
ERR_INVALID_NEW2018_DATE                     => -4,
ERR_INVALID_NEW2018_NEW                      => -5,

};

1;