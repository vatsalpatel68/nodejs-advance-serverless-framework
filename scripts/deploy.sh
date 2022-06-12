#!/bin/bash


#
# First configfure AWS cli with proper IAM permissions.
#

cdk bootstrap
cdk deploy