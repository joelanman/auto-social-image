#! /bin/bash
convert -fill white \
        -background transparent \
        -font GDSTransportBold.ttf \
        -pointsize 72 \
        -size 1040x310 \
        caption:'Hi Ralph this is cool' \
        -gravity North \
        base.png \
        +swap \
        -geometry +0+80 \
        -composite \
        test.png
