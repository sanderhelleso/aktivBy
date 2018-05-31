
<!-- $Id: abook_view.xsl 14719 2016-02-10 19:45:46Z sigurdne $ -->
<xsl:template name="abook_view">
		<xsl:apply-templates select="abook_data"/>
</xsl:template>

<!-- New template-->
<xsl:template match="abook_data">
		<tr>
			<td valign="top">
				<xsl:value-of select="lang_contact"/>
			</td>
			<td>
				<xsl:value-of select="value_abid"/>
				<xsl:text> - </xsl:text>
				<xsl:value-of select="value_contact_name"/>
			</td>
		</tr>
</xsl:template>
