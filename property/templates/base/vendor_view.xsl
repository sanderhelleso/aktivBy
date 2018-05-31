
<!-- $Id: vendor_view.xsl 14719 2016-02-10 19:45:46Z sigurdne $ -->
<xsl:template name="vendor_view">
		<xsl:apply-templates select="vendor_data"/>
</xsl:template>

<!-- New template-->
<xsl:template match="vendor_data">
	<div class="pure-control-group">
		<label>
				<xsl:value-of select="lang_vendor"/>
		</label>
				<xsl:value-of select="value_vendor_id"/>
				<xsl:text> - </xsl:text>
				<xsl:value-of select="value_vendor_name"/>
	</div>
</xsl:template>
