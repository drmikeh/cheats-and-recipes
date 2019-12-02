#!/bin/bash

rm -rf public && hugo && rm -rf docs && mv public docs
